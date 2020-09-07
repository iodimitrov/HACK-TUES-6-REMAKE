import { useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    Avatar,
    MenuItem,
    TextField,
    FormControlLabel,
    Switch,
    Button,
    Grow,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import styles from 'styles/Profile.module.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import cookies from 'next-cookies';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import { useUser } from 'utils/auth/useUser';
import Router from 'next/router';
import { generateSearchQueries } from 'utils/functions';

const Profile = (props) => {
    const { logout } = useUser();
    const { data, update, deleteDocument, mutate } = useDocument(
        `users/${props.user.id}`,
        {
            listen: true,
            revalidateOnMount: true,
            initialData: props.data,
        }
    );
    const { data: users } = useCollection(`users`, { listen: true });

    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [gradeError, setGradeError] = useState(false);
    const [tshirtError, setTshirtError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [edit, setEdit] = useState(false);
    const [dialog, setDialog] = useState(false);

    const lecturesLimit = 50;
    const workshopLimit = 50;
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

    const editProfile = async (e) => {
        e.preventDefault();
        if (!edit) {
            setEdit(true);
        } else {
            if (!/\S/.test(data.name)) {
                setNameError('Невалидно име');
                return;
            }

            if (!/\S/.test(data.surname)) {
                setSurnameError('Невалидна фамилия');
                return;
            }

            if (!/\S/.test(data.phone)) {
                setPhoneError('Невалиден номер');
                return;
            }

            if (!/\S/.test(data.grade) || !grades.includes(data.grade)) {
                setGradeError('Невалиден клас');
                return;
            }

            if (!/\S/.test(data.tshirt) || !tshirts.includes(data.tshirt)) {
                setTshirtError('Невалиден размер');
                return;
            }

            try {
                await update({
                    updatedAt: new Date().toJSON(),
                    name: data.name,
                    surname: data.surname,
                    grade: data.grade,
                    tshirt: data.tshirt,
                    meat: data.meat,
                    phone: data.phone,
                    online: data.online,
                    allergies: data.allergies,
                    lectures: data.lectures,
                    workshop: data.workshop,
                    searchQueries: generateSearchQueries(
                        `${data.name} ${data.surname}`
                    ),
                });
                setSuccess('Профилът бе редактиран успешно.');
            } catch (error) {
                mutate();
                setError(error.message);
            }
            setEdit(false);
        }
    };

    const handlePasswordReset = () => {
        firebase
            .auth()
            .sendPasswordResetEmail(props.user.email)
            .then(() => {
                setSuccess('Изпратен е линк на имейла Ви');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const handleDeletion = async () => {
        try {
            await fetch('/api/deleteuser');
            await logout();
            await deleteDocument();
        } catch (error) {
            mutate();
            setError(error.message);
        }
    };

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Профил &#8226; HackTUES</title>
                <meta name='description' content='Профил в HackTUES'></meta>
            </Head>
            <Navbar />
            <Grow in>
                <Container
                    className={styles.content}
                    maxWidth='md'
                    disableGutters
                >
                    {data ? (
                        <Card className={styles.card}>
                            <CardHeader
                                avatar={<Avatar>{data.name.charAt(0)}</Avatar>}
                                className={styles['card-header']}
                                title={`${data.name} ${data.surname}`}
                                subheader='Профил'
                            />
                            <CardContent
                                id='edit-profile'
                                className={styles['card-content']}
                                component='form'
                                onSubmit={editProfile}
                            >
                                <div className={styles['input-container']}>
                                    <TextField
                                        label='Име (на кирилица)'
                                        value={data.name}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        error={nameError.length > 0}
                                        helperText={nameError}
                                        onKeyUp={handleOnKeyUp}
                                        onKeyDown={handleOnKeyUp}
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    name: e.target.value,
                                                },
                                                false
                                            )
                                        }
                                        required
                                    />
                                    <TextField
                                        label='Фамилия (на кирилица)'
                                        value={data.surname}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        error={surnameError.length > 0}
                                        helperText={surnameError}
                                        onKeyUp={handleOnKeyUp}
                                        onKeyDown={handleOnKeyUp}
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    surname: e.target.value,
                                                },
                                                false
                                            )
                                        }
                                        required
                                    />
                                </div>
                                <div className={styles['input-container']}>
                                    <TextField
                                        label='Имейл'
                                        type='email'
                                        value={props.user.email}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        disabled={edit}
                                        required
                                    />
                                    <TextField
                                        label='Телефон'
                                        type='tel'
                                        placeholder='0899999999'
                                        value={data.phone}
                                        inputProps={{
                                            pattern: '[0-9]{10}',
                                            readOnly: !edit,
                                        }}
                                        error={phoneError.length > 0}
                                        helperText={phoneError}
                                        required
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    phone: e.target.value,
                                                },
                                                false
                                            )
                                        }
                                    />
                                </div>
                                <div className={styles['input-container']}>
                                    <TextField
                                        select
                                        label='Клас'
                                        value={data.grade}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        error={gradeError.length > 0}
                                        helperText={gradeError}
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    grade: e.target.value,
                                                },
                                                false
                                            )
                                        }
                                        required
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
                                        value={data.tshirt}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        error={tshirtError.length > 0}
                                        helperText={tshirtError}
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    tshirt: e.target.value,
                                                },
                                                false
                                            )
                                        }
                                        required
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
                                        value={data.allergies}
                                        multiline
                                        rowsMax={5}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    allergies: e.target.value,
                                                },
                                                false
                                            )
                                        }
                                    />
                                </div>
                                <div className={styles['input-container']}>
                                    <Typography>
                                        <strong>Отбор:</strong>
                                        {data.team ? data.team : ' (няма)'}
                                    </Typography>
                                    <Typography>
                                        <strong>Гласувал за:</strong>
                                        {data.votedFor
                                            ? data.votedFor
                                            : ' (никого)'}
                                    </Typography>
                                </div>
                                {/* {users && (
                                    <div className={styles['input-container']}>
                                        <Tooltip
                                            title={
                                                users.filter(
                                                    (user) => user.lectures
                                                ).length >= lecturesLimit &&
                                                !data.lectures
                                                    ? 'Изчерпани места'
                                                    : ''
                                            }
                                        >
                                            <FormControlLabel
                                                className={
                                                    styles['switch-label']
                                                }
                                                control={
                                                    <Switch
                                                        checked={data.lectures}
                                                        disabled={
                                                            users.filter(
                                                                (user) =>
                                                                    user.lectures
                                                            ).length >=
                                                                lecturesLimit &&
                                                            !data.lectures
                                                        }
                                                        name='lectures'
                                                        color='primary'
                                                        onChange={(e) =>
                                                            edit &&
                                                            mutate(
                                                                {
                                                                    ...data,
                                                                    lectures:
                                                                        e.target
                                                                            .checked,
                                                                },
                                                                false
                                                            )
                                                        }
                                                    />
                                                }
                                                label='Искам да присъствам на лекциите'
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            title={
                                                users.filter(
                                                    (user) => user.workshop
                                                ).length >= workshopLimit &&
                                                !data.workshop
                                                    ? 'Изчерпани места'
                                                    : ''
                                            }
                                        >
                                            <FormControlLabel
                                                className={
                                                    styles['switch-label']
                                                }
                                                control={
                                                    <Switch
                                                        checked={data.workshop}
                                                        disabled={
                                                            users.filter(
                                                                (user) =>
                                                                    user.workshop
                                                            ).length >=
                                                                workshopLimit &&
                                                            !data.workshop
                                                        }
                                                        name='workshop'
                                                        color='primary'
                                                        onChange={(e) =>
                                                            edit &&
                                                            mutate(
                                                                {
                                                                    ...data,
                                                                    workshop:
                                                                        e.target
                                                                            .checked,
                                                                },
                                                                false
                                                            )
                                                        }
                                                    />
                                                }
                                                label='Искам да присъствам на уъркшопа'
                                            />
                                        </Tooltip>
                                    </div>
                                )} */}
                                <div className={styles['input-container']}>
                                    <FormControlLabel
                                        className={styles['switch-label']}
                                        control={
                                            <Switch
                                                checked={data.meat}
                                                name='meat'
                                                color='primary'
                                                onChange={(e) =>
                                                    edit &&
                                                    mutate(
                                                        {
                                                            ...data,
                                                            meat:
                                                                e.target
                                                                    .checked,
                                                        },
                                                        false
                                                    )
                                                }
                                            />
                                        }
                                        label='Консумирате ли месо?'
                                    />
                                    <FormControlLabel
                                        className={styles['switch-label']}
                                        control={
                                            <Switch
                                                checked={data.online}
                                                name='online'
                                                color='primary'
                                                onChange={(e) =>
                                                    edit &&
                                                    mutate(
                                                        {
                                                            ...data,
                                                            online:
                                                                e.target
                                                                    .checked,
                                                        },
                                                        false
                                                    )
                                                }
                                            />
                                        }
                                        label='Искам да съм изцяло онлайн'
                                    />
                                </div>
                            </CardContent>
                            <CardActions
                                className={styles['card-actions']}
                                disableSpacing
                            >
                                <div className={styles['input-container']}>
                                    <Button
                                        className={`${styles.edit} ${
                                            edit ? styles['is-editing'] : ''
                                        }`}
                                        disableElevation
                                        type='submit'
                                        color='primary'
                                        variant='contained'
                                        form='edit-profile'
                                    >
                                        {edit ? 'Запази' : 'Редактирай'}
                                    </Button>
                                    {!edit ? (
                                        <>
                                            <Button
                                                className={styles.password}
                                                disableElevation
                                                color='secondary'
                                                variant='contained'
                                                onClick={handlePasswordReset}
                                            >
                                                Смяна на паролата
                                            </Button>
                                            <Button
                                                className={styles.delete}
                                                disableElevation
                                                variant='contained'
                                                onClick={() => setDialog(true)}
                                            >
                                                Изтрий профила
                                            </Button>
                                            <Dialog
                                                open={dialog}
                                                onClose={() => setDialog(false)}
                                            >
                                                <DialogTitle>
                                                    Сигурни ли сте, че искате да
                                                    изтриете профила си?
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id='alert-dialog-description'>
                                                        Let Google help apps
                                                        determine location. This
                                                        means sending anonymous
                                                        location data to Google,
                                                        even when no apps are
                                                        running.
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button
                                                        onClick={() =>
                                                            setDialog(false)
                                                        }
                                                        color='primary'
                                                        variant='outlined'
                                                    >
                                                        Отказ
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            handleDeletion();
                                                            setDialog(false);
                                                        }}
                                                        disableElevation
                                                        color='primary'
                                                        variant='contained'
                                                    >
                                                        Потвърди
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </>
                                    ) : (
                                        <Button
                                            className={styles.delete}
                                            disableElevation
                                            variant='contained'
                                            onClick={() => {
                                                setEdit(false);
                                                mutate();
                                            }}
                                        >
                                            Отказ
                                        </Button>
                                    )}
                                </div>
                            </CardActions>
                        </Card>
                    ) : (
                        'loading'
                    )}
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
                    <Snackbar
                        open={success.length > 0}
                        autoHideDuration={6000}
                        onClose={() => setSuccess(false)}
                    >
                        <Alert
                            elevation={6}
                            variant='filled'
                            onClose={() => setSuccess(false)}
                            severity='success'
                        >
                            {success}
                        </Alert>
                    </Snackbar>
                </Container>
            </Grow>
            <Footer />
        </Container>
    );
};

Profile.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
    let data = null;
    if (!allCookies.auth) {
        if (typeof window === 'undefined') {
            ctx.res.writeHead(302, { Location: '/' });
            ctx.res.end();
        } else {
            Router.push('/');
        }
    } else {
        if (!allCookies.auth.emailVerified) {
            if (typeof window === 'undefined') {
                ctx.res.writeHead(302, { Location: '/verifyemail' });
                ctx.res.end();
            } else {
                Router.push('/verifyemail');
            }
        } else {
            let doc = await firebase
                .firestore()
                .doc(`users/${allCookies.auth.id}`)
                .get();
            data = doc.data();
            return { data, user: allCookies.auth };
        }
    }
    return {};
};

export default Profile;
