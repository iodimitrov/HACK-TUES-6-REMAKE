import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    SwipeableDrawer,
} from '@material-ui/core';
import { useUser } from 'utils/auth/useUser';
import cookies from 'next-cookies';
import { Menu } from '@material-ui/icons';
import Link from './Link';
import { useState, useEffect } from 'react';
import styles from 'styles/Navbar.module.scss';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logout } = useUser();

    useEffect(() => {}, []);

    const navbarLinks = () => (
        <>
            <Link underline='none' className={styles.link} href='/'>
                <Button>Програма</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/'>
                <Button>Архив</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/'>
                <Button>Регламент</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/'>
                <Button>За Hack TUES</Button>
            </Link>
            <span className={styles.separator}></span>
            <Link underline='none' className={styles.link} href='/'>
                <Button>Влез</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/'>
                <Button
                    disableElevation={true}
                    color='primary'
                    variant='contained'
                >
                    Регистрация
                </Button>
            </Link>
        </>
    );

    return (
        <AppBar elevation={0} className={styles.navbar} position='static'>
            <Toolbar>
                <Link underline='none' className={styles.link} href='/'>
                    <Typography className={styles.title} variant='h1'>
                        <span>Hack</span>
                        <span>TUES</span>
                        <span>&nbsp;6</span>
                    </Typography>
                </Link>

                <div className={styles.links}>{navbarLinks()}</div>
                <span className={styles.separator}></span>
                <IconButton
                    className={styles['drawer-toggle']}
                    color='inherit'
                    aria-label='menu'
                    onClick={() => setOpen(!open)}
                >
                    <Menu fontSize='large' />
                </IconButton>
                <SwipeableDrawer
                    anchor='right'
                    className='drawer'
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                >
                    <Link underline='none' href='/'>
                        <Typography className='title' variant='h2'>
                            <span>Hack</span>
                            <span>TUES</span>
                            <span>&nbsp;6</span>
                        </Typography>
                    </Link>
                    {navbarLinks()}
                </SwipeableDrawer>
            </Toolbar>
        </AppBar>
    );
};

export const getServerSideProps = async (ctx) => {
    const allCookies = cookies(ctx);
    // if (allCookies.auth) {
    //     ctx.res.writeHead(302, { Location: "/auth" });
    //     ctx.res.end();
    //     return { props: {} };
    // }
    return {
        props: {},
    };
};

export default Navbar;
