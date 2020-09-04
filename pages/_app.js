import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import 'styles/global.scss';
import NextNprogress from 'nextjs-progressbar';
import { config } from 'utils/auth/initFirebase';
import 'firebase/firestore';
import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const fuego = new Fuego(config);

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Page</title>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, shrink-to-fit=no'
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <StylesProvider injectFirst>
                    <NextNprogress
                        color={theme.palette.secondary.main}
                        height='3'
                        options={{ showSpinner: false }}
                    />
                    <GoogleReCaptchaProvider
                        reCaptchaKey={
                            process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                        }
                        language='bg'
                    >
                        <FuegoProvider fuego={fuego}>
                            <Component {...pageProps} />
                        </FuegoProvider>
                    </GoogleReCaptchaProvider>
                </StylesProvider>
            </ThemeProvider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
