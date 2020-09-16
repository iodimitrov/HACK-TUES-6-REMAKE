import { useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    TextField,
    Button,
    Grow,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import styles from 'styles/Login.module.scss';
import { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import cookies from 'next-cookies';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState({
        value: '',
        error: false,
    });
    const [password, setPassword] = useState({
        value: '',
        error: false,
    });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [verified, setVerified] = useState(false);
    const [dialog, setDialog] = useState(false);

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

        firebase
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                router.push('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const verifyRecaptcha = (token) => {
        fetch(`/api/verify/${token}`).then((response) => {
            response.json().then((json) => {
                setVerified(json.success);
            });
        });
    };

    const handlePasswordReset = () => {
        firebase
            .auth()
            .sendPasswordResetEmail(email.value)
            .then(() => {
                setSuccess('Изпратен е линк на имейла Ви');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Вход &#8226; HackTUES</title>
                <meta name='description' content='Вход в HackTUES'></meta>
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
                                onChange={(e) =>
                                    setEmail({
                                        value: e.target.value,
                                        error: false,
                                    })
                                }
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
                                onChange={(e) =>
                                    setPassword({
                                        value: e.target.value,
                                        error: false,
                                    })
                                }
                            />
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
                                Влез
                            </Button>
                            <Button
                                className={styles['password-reset']}
                                disableElevation
                                color='primary'
                                variant='text'
                                onClick={() => setDialog(true)}
                            >
                                Забравена парола
                            </Button>
                            <Dialog
                                open={dialog}
                                onClose={() => setDialog(false)}
                            >
                                <DialogTitle>Смяна на паролата</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id='alert-dialog-description'>
                                        <TextField
                                            label='Имейл'
                                            type='email'
                                            value={email.value}
                                            error={email.error.length > 0}
                                            helperText={email.error}
                                            required
                                            onChange={(e) =>
                                                setEmail({
                                                    value: e.target.value,
                                                    error: false,
                                                })
                                            }
                                        />
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => setDialog(false)}
                                        color='primary'
                                        variant='outlined'
                                    >
                                        Отказ
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handlePasswordReset();
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

Login.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
    if (allCookies.auth) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
    }
    return {};
};

export default Login;
