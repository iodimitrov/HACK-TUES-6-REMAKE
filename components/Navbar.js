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
import MuiLink from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import Link from './Link';
import { useState } from 'react';
import styles from 'styles/Navbar.module.scss';
import { useUser } from 'utils/auth/useUser';
import { useDocument } from '@nandorojo/swr-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';

const Navbar = (props) => {
    const { user, logout } = useUser();
    const { data } = useDocument(
        firebase.auth().currentUser
            ? `users/${firebase.auth().currentUser.uid}`
            : null,
        {
            listen: true,
        }
    );
    const [open, setOpen] = useState(false);
    const [anchorArchive, setAnchorArchive] = useState(null);
    const [anchorDecl, setAnchorDecl] = useState(null);
    const [limit, setLimit] = useState(
        new Date().getTime() - new Date('2020-09-28T00:00:00').getTime() >= 0
    );

    const handleClose = () => {
        setAnchorArchive(null);
        setAnchorDecl(null);
    };

    const navbarLinks = () => (
        <>
            <Link underline='none' className={styles.link} href='/schedule'>
                <Button>Програма</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/teams'>
                <Button>Отбори</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/leaderboard'>
                <Button>Класация</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/winners'>
                <Button>Победители</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/topics'>
                <Button>Теми</Button>
            </Link>
            <Link underline='none' className={styles.link} href='/mentors'>
                <Button>Ментори</Button>
            </Link>
            <MuiLink
                underline='none'
                className={styles.link}
                onClick={(e) => setAnchorArchive(e.currentTarget)}
            >
                <Button>Архив</Button>
            </MuiLink>
            <Menu
                className='archive'
                MenuListProps={{ style: { padding: 0 } }}
                anchorEl={anchorArchive}
                keepMounted
                open={Boolean(anchorArchive)}
                onClose={handleClose}
            >
                <MenuItem
                    underline='none'
                    className='archive-item hacktues'
                    component={Link}
                    href='/archive/[id]'
                    as='/archive/hacktues'
                    onClick={handleClose}
                >
                    <span>Hack</span> <span>&nbsp;TUES</span>
                </MenuItem>
                <MenuItem
                    underline='none'
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
                    underline='none'
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
                    underline='none'
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
                    underline='none'
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
            {/* <MuiLink
                underline='none'
                className={styles.link}
                onClick={(e) => setAnchorDecl(e.currentTarget)}
            >
                <Button className={styles.link}>Декларации</Button>
            </MuiLink> */}
            <Menu
                className='declarations'
                MenuListProps={{ style: { padding: 0 } }}
                anchorEl={anchorDecl}
                keepMounted
                open={Boolean(anchorDecl)}
                onClose={handleClose}
            >
                <MenuItem
                    underline='none'
                    className='declaration-item'
                    component={MuiLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/declaration_adult.pdf?alt=media&token=e46fd402-e6eb-44ce-aa12-108eda6b281c'
                    onClick={handleClose}
                >
                    <span>
                        Декларация (<strong>на или над</strong> 18 години)
                    </span>
                </MenuItem>
                <MenuItem
                    underline='none'
                    className='declaration-item'
                    component={MuiLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/declaration_minor.pdf?alt=media&token=451e2a54-e70e-4901-89fa-a1712fb04050'
                    onClick={handleClose}
                >
                    <span>
                        Декларация (<strong>под</strong> 18 години)
                    </span>
                </MenuItem>
            </Menu>
            <span className={styles.separator}></span>
            {user ? (
                <>
                    {data && data.team ? (
                        <Link
                            underline='none'
                            className={styles.link}
                            href='/team/[id]'
                            as={`/team/${data.team.id}`}
                        >
                            <Button
                                disableElevation
                                color='primary'
                                variant='contained'
                            >
                                Моят отбор
                            </Button>
                        </Link>
                    ) : (
                        !limit && (
                            <Link
                                underline='none'
                                className={styles.link}
                                href='/createteam'
                            >
                                <Button
                                    disableElevation
                                    color='primary'
                                    variant='contained'
                                >
                                    Създай отбор
                                </Button>
                            </Link>
                        )
                    )}
                    <Link
                        underline='none'
                        className={styles.link}
                        href='/profile'
                    >
                        <Button>Профил</Button>
                    </Link>
                    <Button className={styles.link} onClick={() => logout()}>
                        Излез
                    </Button>
                </>
            ) : (
                <>
                    <Link
                        underline='none'
                        className={styles.link}
                        href='/login'
                    >
                        <Button>Влез</Button>
                    </Link>
                    <Link
                        underline='none'
                        className={styles.link}
                        href='/register'
                    >
                        <Button
                            disableElevation
                            color='primary'
                            variant='contained'
                        >
                            Регистрация
                        </Button>
                    </Link>
                </>
            )}
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
