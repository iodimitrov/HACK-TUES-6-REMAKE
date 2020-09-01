import { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import styles from 'styles/Register.module.scss';
import { useUser } from 'utils/auth/useUser';
import { useRouter } from 'next/router';

const Register = () => {
    const { user, logout } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, []);

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
    const [meat, setMeat] = useState(false);
    const [allergies, setAllergies] = useState('');
    const [gdpr, setGdpr] = useState({ checked: false, error: false });
    const [regulation, setRegulation] = useState({
        checked: false,
        error: false,
    });

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
                                label='Съгласен съм с регламента на хакатона'
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
                                label='Съгласен съм с Общият регламент за защита на данните'
                            />
                        </div>
                        <div className={styles['input-container']}>
                            <Button
                                className={styles.submit}
                                type='submit'
                                disableElevation
                                color='primary'
                                variant='contained'
                            >
                                Регистритай ме
                            </Button>
                        </div>
                    </form>
                </Container>
            </Grow>
            <Footer />
        </Container>
    );
};

export default Register;
