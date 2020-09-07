import { IconButton, Typography, Box, Container } from '@material-ui/core';
import {
    Facebook,
    Instagram,
    YouTube,
    AlternateEmail,
} from '@material-ui/icons';
import styles from 'styles/Footer.module.scss';

const Footer = () => (
    <Box className={styles['footer-container']}>
        <Container
            maxWidth={false}
            disableGutters
            className={styles.footer}
            component='footer'
        >
            <Box className={styles['icon-container']}>
                <IconButton
                    href='https://www.facebook.com/HackTUES/'
                    className={`${styles.facebook} ${styles['icon-button']}`}
                    target='_blank'
                    rel='noopener'
                    size='small'
                >
                    <Facebook className={styles.icon} />
                </IconButton>
                <IconButton
                    href='https://www.instagram.com/hacktues/'
                    className={`${styles.instagram} ${styles['icon-button']}`}
                    target='_blank'
                    rel='noopener'
                    size='small'
                >
                    <Instagram className={styles.icon} />
                </IconButton>
                <IconButton
                    href='https://www.youtube.com/channel/UCQcbYkAKPEgfjzvwb2sUWSQ'
                    className={`${styles.youtube} ${styles['icon-button']}`}
                    target='_blank'
                    rel='noopener'
                    size='small'
                >
                    <YouTube className={styles.icon} />
                </IconButton>
                <IconButton
                    href='mailto:hacktues@elsys-bg.org'
                    className={`${styles.email} ${styles['icon-button']}`}
                    target='_blank'
                    rel='noopener'
                    size='small'
                >
                    <AlternateEmail className={styles.icon} />
                </IconButton>
            </Box>
            <Typography className={styles.text}>
                © {new Date().getFullYear() || 2020} – Hack TUES 6 –
                Технологично училище Електронни системи към Технически
                Университет - София Всички права са запазени.
            </Typography>
        </Container>
    </Box>
);

export default Footer;
