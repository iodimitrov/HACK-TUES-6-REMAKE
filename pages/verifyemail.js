import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { Container, Typography, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import styles from 'styles/VerifyEmail.module.scss';
import Router, { useRouter } from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import cookies from 'next-cookies';

const VerifyEmail = (props) => {
    const router = useRouter();

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let interval;
        if (props.emailVerified) {
            router.replace('/');
        } else {
            firebase.auth().onAuthStateChanged((user) => {
                interval = setInterval(() => {
                    user &&
                        user.reload().then(() => {
                            if (user.emailVerified) {
                                clearInterval(interval);
                                router.replace('/');
                                return;
                            }
                        });
                }, 3000);
            });
        }
        return () => {
            clearInterval(interval);
        };
    }, []);

    const resendEmail = () => {
        firebase
            .auth()
            .currentUser.sendEmailVerification()
            .then(() => {
                setSuccess('Линкът бе изпратен успешно.');
            })
            .catch(() => {
                setError('Твърде много опити or some other error idk');
            });
    };

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Потвърждаване на имейл &#8226; HackTUES</title>
                <meta
                    name='description'
                    content='Потвърждаване на имейл в HackTUES'
                ></meta>
            </Head>
            <Navbar />
            <Container className={styles.content} disableGutters>
                <Typography>
                    Изпратен е мейл за потвърждаване на:{' '}
                    <strong>{props.email}</strong>
                </Typography>
                <Button
                    disableElevation
                    variant='contained'
                    color='primary'
                    onClick={resendEmail}
                >
                    Изпращане отново
                </Button>
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
            <Footer />
        </Container>
    );
};

VerifyEmail.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
    if (!allCookies.auth || allCookies.auth.emailVerified) {
        if (typeof window === 'undefined') {
            ctx.res.writeHead(302, { Location: '/' });
            ctx.res.end();
        } else {
            Router.push('/');
        }
    }
    return { ...allCookies.auth };
};

export default VerifyEmail;
