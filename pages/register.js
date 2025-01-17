import { useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    TextField,
    MenuItem,
    Switch,
    Checkbox,
    FormControlLabel,
    Button,
    Grow,
    Snackbar,
    Typography,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@material-ui/core';
import GDPR from 'components/GDPR';
import Alert from '@material-ui/lab/Alert';
import styles from 'styles/Register.module.scss';
import { useRouter } from 'next/router';
import { generateSearchQueries } from 'utils/functions';
import firebase from 'firebase/app';
import 'firebase/auth';
import cookies from 'next-cookies';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import NextLink from 'components/Link';

const Register = () => {
    const router = useRouter();

    const [email, setEmail] = useState({
        value: '',
        error: false,
    });
    const [reEmail, setReEmail] = useState({
        value: '',
        error: false,
    });
    const [password, setPassword] = useState({
        value: '',
        error: false,
    });
    const [rePassword, setRePassword] = useState({
        value: '',
        error: false,
    });
    const [name, setName] = useState({
        value: '',
        error: false,
    });
    const [surname, setSurname] = useState({
        value: '',
        error: false,
    });
    const [grade, setGrade] = useState({
        value: '',
        error: false,
    });
    const [tshirt, setTshirt] = useState({
        value: '',
        error: false,
    });
    const [phone, setPhone] = useState({
        value: '',
        error: false,
    });
    const [meat, setMeat] = useState(false);
    const [online, setOnline] = useState(false);
    const [allergies, setAllergies] = useState('');
    const [gdpr, setGdpr] = useState({ checked: false, error: false });
    const [regulation, setRegulation] = useState({
        checked: false,
        error: false,
    });
    const [dialog, setDialog] = useState(false);
    const [error, setError] = useState(false);

    const [verified, setVerified] = useState(false);

    const grades = [
        '9А',
        '9Б',
        '9В',
        '9Г',
        '10А',
        '10Б',
        '10В',
        '10Г',
        '11А',
        '11Б',
        '11В',
        '11Г',
        '12А',
        '12Б',
        '12В',
        '12Г',
        '2020А',
        '2020Б',
        '2020В',
        '2020Г',
    ];

    const tshirts = ['S', 'M', 'L', 'XL', '2XL'];

    const handleOnKeyUp = (e) => {
        e.target.value = e.target.value.replace(/[^а-я-\s]/i, '');
    };

    const verifyRecaptcha = (token) => {
        fetch(`/api/verify/${token}`).then((response) => {
            response.json().then((json) => {
                setVerified(json.success);
            });
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/\S/.test(email.value)) {
            setEmail({ value: email.value, error: 'Невалиден имейл' });
            return;
        }

        if (!/\S/.test(password.value)) {
            setPassword({ value: password.value, error: 'Невалидна парола' });
            return;
        }

        if (password.value.length < 6) {
            setPassword({
                value: password.value,
                error: 'Паролата трябва да е минимум 6 символа',
            });
            return;
        }

        if (!/\S/.test(name.value)) {
            setName({ value: name.value, error: 'Невалидно име' });
            return;
        }

        if (!/\S/.test(surname.value)) {
            setSurname({ value: surname.value, error: 'Невалидна фамилия' });
            return;
        }

        if (!/\S/.test(phone.value)) {
            setPhone({ value: phone.value, error: 'Невалиден номер' });
            return;
        }

        if (!/\S/.test(grade.value) || !grades.includes(grade.value)) {
            setGrade({ value: grade.value, error: 'Невалиден клас' });
            return;
        }

        if (!/\S/.test(tshirt.value) || !tshirts.includes(tshirt.value)) {
            setTshirt({ value: tshirt.value, error: 'Невалиден размер' });
            return;
        }

        if (email.value !== reEmail.value) {
            setEmail({ value: email.value, error: 'Имейлите не съвпадат' });
            setReEmail({ value: reEmail.value, error: 'Имейлите не съвпадат' });
            return;
        }

        if (password.value !== rePassword.value) {
            setPassword({
                value: password.value,
                error: 'Паролите не съвпадат',
            });
            setRePassword({
                value: rePassword.value,
                error: 'Паролите не съвпадат',
            });
            return;
        }

        if (!regulation.checked) {
            setRegulation({ checked: regulation.checked, error: true });
            return;
        }

        if (!gdpr.checked) {
            setGdpr({ checked: gdpr.checked, error: true });
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((data) => {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(data.user.uid)
                    .set({
                        createdAt: new Date().toJSON(),
                        updatedAt: new Date().toJSON(),
                        name: name.value,
                        email: email.value,
                        surname: surname.value,
                        grade: grade.value,
                        tshirt: tshirt.value,
                        meat: meat,
                        online: online,
                        allergies: allergies,
                        team: null,
                        isLeader: false,
                        searchQueries: generateSearchQueries(
                            `${name.value} ${surname.value}`
                        ),
                        workshop: false,
                        lectures: false,
                        votedFor: null,
                        phone: phone.value,
                    })
                    .then(async () => {
                        await data.user.sendEmailVerification();
                        router.replace('/verifyemail');
                    })
                    .catch((error) => {
                        setError('Something went wrong.');
                    });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Регистрация &#8226; HackTUES</title>
                <meta
                    name='description'
                    content='Регистрация в HackTUES'
                ></meta>
            </Head>
            <Navbar />
            <Grow in>
                <Container
                    maxWidth='md'
                    className={styles.content}
                    disableGutters
                >
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles['input-container']}>
                            <TextField
                                label='Имейл'
                                type='email'
                                value={email.value}
                                error={email.error.length > 0}
                                helperText={email.error}
                                required
                                onChange={(e) => {
                                    setEmail({
                                        value: e.target.value,
                                        error: false,
                                    });
                                    setReEmail({
                                        value: reEmail.value,
                                        error: false,
                                    });
                                }}
                            />
                            <TextField
                                label='Повторете имейла'
                                type='email'
                                value={reEmail.value}
                                error={reEmail.error.length > 0}
                                helperText={reEmail.error}
                                required
                                onPaste={(e) => e.preventDefault()}
                                onChange={(e) => {
                                    setReEmail({
                                        value: e.target.value,
                                        error: false,
                                    });
                                    setEmail({
                                        value: email.value,
                                        error: false,
                                    });
                                }}
                            />
                        </div>
                        <div className={styles['input-container']}>
                            <TextField
                                label='Парола'
                                type='password'
                                value={password.value}
                                error={password.error.length > 0}
                                helperText={password.error}
                                required
                                onChange={(e) => {
                                    setPassword({
                                        value: e.target.value,
                                        error: false,
                                    });
                                    setRePassword({
                                        value: rePassword.value,
                                        error: false,
                                    });
                                }}
                            />
                            <TextField
                                label='Повторете паролата'
                                type='password'
                                value={rePassword.value}
                                error={rePassword.error.length > 0}
                                helperText={rePassword.error}
                                required
                                onPaste={(e) => e.preventDefault()}
                                onChange={(e) => {
                                    setRePassword({
                                        value: e.target.value,
                                        error: false,
                                    });
                                    setPassword({
                                        value: password.value,
                                        error: false,
                                    });
                                }}
                            />
                        </div>
                        <div className={styles['input-container']}>
                            <TextField
                                label='Име (на кирилица)'
                                value={name.value}
                                error={name.error.length > 0}
                                helperText={name.error}
                                required
                                onKeyUp={handleOnKeyUp}
                                onKeyDown={handleOnKeyUp}
                                onChange={(e) =>
                                    setName({
                                        value: e.target.value,
                                        error: false,
                                    })
                                }
                            />
                            <TextField
                                label='Фамилия (на кирилица)'
                                value={surname.value}
                                error={surname.error.length > 0}
                                helperText={surname.error}
                                required
                                onKeyUp={handleOnKeyUp}
                                onKeyDown={handleOnKeyUp}
                                onChange={(e) =>
                                    setSurname({
                                        value: e.target.value,
                                        error: false,
                                    })
                                }
                            />
                        </div>
                        <div className={styles['input-container']}>
                            <TextField
                                select
                                label='Клас'
                                value={grade.value}
                                error={grade.error.length > 0}
                                helperText={grade.error}
                                required
                                onChange={(e) =>
                                    setGrade({
                                        value: e.target.value,
                                        error: false,
                                    })
                                }
                            >
                                {grades.map((grade, i) => (
                                    <MenuItem key={i} value={grade}>
                                        {grade}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                select
                                label='Размер на тениска'
                                value={tshirt.value}
                                error={tshirt.error.length > 0}
                                helperText={tshirt.error}
                                required
                                onChange={(e) =>
                                    setTshirt({
                                        value: e.target.value,
                                        error: false,
                                    })
                                }
                            >
                                {tshirts.map((tshirt, i) => (
                                    <MenuItem key={i} value={tshirt}>
                                        {tshirt}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className={styles['input-container']}>
                            <TextField
                                label='Телефон'
                                type='tel'
                                placeholder='0899999999'
                                value={phone.value}
                                inputProps={{ pattern: '[0-9]{10}' }}
                                error={phone.error.length > 0}
                                helperText={phone.error}
                                required
                                onChange={(e) =>
                                    setPhone({
                                        value: e.target.value,
                                        error: false,
                                    })
                                }
                            />
                            <TextField
                                label='Алергии'
                                value={allergies}
                                multiline
                                rowsMax={5}
                                onChange={(e) => setAllergies(e.target.value)}
                            />
                        </div>
                        <div className={styles['input-container']}>
                            <FormControlLabel
                                className={styles['switch-label']}
                                control={
                                    <Switch
                                        checked={meat}
                                        onChange={(e) =>
                                            setMeat(e.target.checked)
                                        }
                                        name='meat'
                                        color='primary'
                                    />
                                }
                                label='Консумирате ли месо?'
                            />
                            <FormControlLabel
                                className={styles['switch-label']}
                                control={
                                    <Switch
                                        checked={online}
                                        onChange={(e) =>
                                            setOnline(e.target.checked)
                                        }
                                        name='online'
                                        color='primary'
                                    />
                                }
                                label='Искам да съм изцяло онлайн'
                            />
                        </div>
                        <div className={styles['input-container']}>
                            <FormControlLabel
                                style={{
                                    color: regulation.error ? 'red' : 'initial',
                                }}
                                control={
                                    <Checkbox
                                        required
                                        checked={regulation.checked}
                                        onChange={(e) =>
                                            setRegulation({
                                                checked: e.target.checked,
                                                error: false,
                                            })
                                        }
                                        name='regulation'
                                        color='primary'
                                    />
                                }
                                label={
                                    <>
                                        Съгласен съм с&nbsp;
                                        <NextLink href='/regulation'>
                                            регламента на хакатона
                                        </NextLink>
                                    </>
                                }
                            />
                        </div>
                        <div className={styles['input-container']}>
                            <FormControlLabel
                                style={{
                                    color: gdpr.error ? 'red' : 'initial',
                                }}
                                control={
                                    <Checkbox
                                        required
                                        checked={gdpr.checked}
                                        onChange={(e) =>
                                            setGdpr({
                                                checked: e.target.checked,
                                                error: false,
                                            })
                                        }
                                        name='gdpr'
                                        color='primary'
                                    />
                                }
                                label={
                                    <>
                                        Съгласен съм с&nbsp;
                                        <Link onClick={() => setDialog(true)}>
                                            Общият регламент за защита на
                                            данните
                                        </Link>
                                    </>
                                }
                            />
                            <Dialog
                                onClose={() => setDialog(false)}
                                open={dialog}
                            >
                                <DialogTitle onClose={() => setDialog(false)}>
                                    Политика за поверителност на Hack TUES 6
                                </DialogTitle>
                                <DialogContent>
                                    <GDPR />
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className={styles['input-container']}>
                            <GoogleReCaptcha onVerify={verifyRecaptcha} />
                            <Button
                                className={styles.submit}
                                type='submit'
                                disableElevation
                                color='primary'
                                variant='contained'
                                disabled={!verified}
                            >
                                Регистрирай ме
                            </Button>
                        </div>
                        <div className={styles['input-container']}>
                            <Typography component='em'>
                                <strong style={{ color: 'red' }}>
                                    Внимание:
                                </strong>{' '}
                                За лекциите и уъркшопите ще може да се запишете
                                от <u>'Профил'</u> страницата, когато се
                                регистрирате успешно :). Имайте предвид, че
                                бройките са ограничени.
                                <br />
                                <br />
                                Този сайт е защитен от reCAPTCHA и важат 
                                <Link
                                    href='https://policies.google.com/privacy?hl=bg'
                                    rel='noopener noreferrer'
                                    target='_blank'
                                >
                                    Декларацията за поверителност
                                </Link>{' '}
                                и{' '}
                                <Link
                                    href='https://policies.google.com/terms?hl=bg'
                                    rel='noopener noreferrer'
                                    target='_blank'
                                >
                                    Общите условия на Google
                                </Link>
                                .
                            </Typography>
                        </div>
                    </form>
                    <Snackbar
                        open={error.length > 0}
                        autoHideDuration={6000}
                        onClose={() => setError(false)}
                    >
                        <Alert
                            elevation={6}
                            variant='filled'
                            onClose={() => setError(false)}
                            severity='error'
                        >
                            {error}
                        </Alert>
                    </Snackbar>
                </Container>
            </Grow>
            <Footer />
        </Container>
    );
};

Register.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
    if (allCookies.auth) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
    }
    return {};
};

export default Register;
