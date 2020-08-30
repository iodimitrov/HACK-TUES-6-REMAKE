import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    SwipeableDrawer,
    Menu,
    MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Link from './Link';
import { useState, useEffect } from 'react';
import styles from 'styles/Navbar.module.scss';

const Navbar = (props) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {}, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const navbarLinks = () => (
        <>
            <Link underline='none' className={styles.link} href='/schedule'>
                <Button>Програма</Button>
            </Link>
            <Button className={styles.link} onClick={handleClick}>
                Архив
            </Button>
            <Menu
                className='archive'
                MenuListProps={{ style: { padding: 0 } }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    className='archive-item hacktues'
                    component={Link}
                    href='/archive/[id]'
                    as='/archive/hacktues'
                    onClick={handleClose}
                >
                    <span>Hack</span> <span>&nbsp;TUES</span>
                </MenuItem>
                <MenuItem
                    className='archive-item hacktues2'
                    component={Link}
                    href='/archive/[id]'
                    as='/archive/hacktues2'
                    onClick={handleClose}
                >
                    <span>Hack</span> <span>&nbsp;TUES</span>
                    <span>&nbsp;2</span>
                </MenuItem>
                <MenuItem
                    className='archive-item hacktues3'
                    component={Link}
                    href='/archive/[id]'
                    as='/archive/hacktues3'
                    onClick={handleClose}
                >
                    <span>Hack</span> <span>&nbsp;TUES</span>
                    <span>&nbsp;3</span>
                </MenuItem>
                <MenuItem
                    className='archive-item hacktues30'
                    component={Link}
                    href='/archive/[id]'
                    as='/archive/hacktues30'
                    onClick={handleClose}
                >
                    <span>Hack</span> <sup>&nbsp;30x</sup>
                    <span>TUES</span>
                </MenuItem>
                <MenuItem
                    className='archive-item hacktues365'
                    component={Link}
                    href='/archive/[id]'
                    as='/archive/hacktues365'
                    onClick={handleClose}
                >
                    <span>Hack</span> <span>&nbsp;TUES</span>
                    <sup>^365</sup>
                </MenuItem>
            </Menu>
            <Link underline='none' className={styles.link} href='/regulation'>
                <Button>Регламент</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/about'>
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
                    <MenuIcon fontSize='large' />
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

export default Navbar;
