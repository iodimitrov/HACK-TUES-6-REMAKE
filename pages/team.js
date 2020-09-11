import { useState, useEffect } from 'react';
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
    Link,
    Chip,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import styles from 'styles/Team.module.scss';
import firebase from 'firebase/app';
import cookies from 'next-cookies';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import Router from 'next/router';
import { getBeautifulColor } from 'utils/functions';

const Team = (props) => {
    const { data, update, deleteDocument, mutate } = useDocument(
        `teams/${props.team.id}`,
        {
            listen: true,
            revalidateOnMount: true,
            initialData: props.team,
        }
    );

    const { data: tech } = useCollection('tech', {
        initialData: props.tech,
    });

    const [nameError, setNameError] = useState(false);
    const [projectTech, setProjectTech] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        if (data.projectUsers) {
            Promise.all(
                data.projectUsers.map(async (user) => {
                    let doc = await user.get();
                    return doc.data();
                })
            ).then((users) => setProjectUsers(users));
        }
        currentTech();
    }, [data]);

    const currentTech = () => {
        if (data.projectTech) {
            Promise.all(
                data.projectTech.map(async (tech) => {
                    let doc = await tech.get();
                    return doc.data();
                })
            ).then((tech) => setProjectTech(tech));
        }
    };

    const editTeam = async (e) => {
        e.preventDefault();
        if (!edit) {
            setEdit(true);
        } else {
            if (!/\S/.test(data.name)) {
                setNameError('Невалидно име');
                return;
            }

            try {
                await update({
                    updatedAt: new Date().toJSON(),
                    name: data.name,
                    projectName: data.projectName,
                    projectLinks: data.projectLinks,
                    projectDescription: data.projectDescription,
                    projectTech: projectTech.map((tech) =>
                        firebase.firestore().doc(`tech/${tech.name}`)
                    ),
                });
                setSuccess('Отборът бе редактиран успешно.');
            } catch (error) {
                mutate();
                setError(error.message);
            }

            setEdit(false);
        }
    };

    const handleTech = (e, color) => {
        const value = e.target.children[0].innerHTML;
        if (e.target.classList.contains('selected-tech')) {
            e.target.classList.remove('selected-tech');
            let temp = projectTech.filter((tech) => tech.name !== value);
            setProjectTech(temp);
        } else {
            e.target.classList.add('selected-tech');
            setProjectTech([
                ...new Set([...projectTech, { name: value, color }]),
            ]);
        }
    };

    const handleDeletion = () => {};

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Отбор &#8226; HackTUES</title>
                <meta name='description' content='Отбор в HackTUES'></meta>
            </Head>
            <Navbar />
            <Container className={styles.content} maxWidth='md' disableGutters>
                {data ? (
                    <Grow in>
                        <Card className={styles.card}>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        {data.name
                                            ? data.name.charAt(0)
                                            : '' || ''}
                                    </Avatar>
                                }
                                className={styles['card-header']}
                                title={data.name}
                                subheader='Отбор'
                            />
                            <CardContent
                                id='edit-team'
                                className={styles['card-content']}
                                component='form'
                                onSubmit={editTeam}
                            >
                                <div className={styles['input-container']}>
                                    <TextField
                                        label='Име на отбора'
                                        value={data.name || ''}
                                        error={nameError.length > 0}
                                        helperText={nameError}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        required
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    name: e.target.value,
                                                },
                                                false
                                            )
                                        }
                                    />
                                    <TextField
                                        label='Име на проекта'
                                        value={data.projectName || ''}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    projectName: e.target.value,
                                                },
                                                false
                                            )
                                        }
                                    />
                                </div>
                                <div className={styles['input-container']}>
                                    <TextField
                                        label='Описание на проекта'
                                        value={data.projectDescription || ''}
                                        multiline
                                        rowsMax={5}
                                        InputProps={{
                                            readOnly: !edit,
                                        }}
                                        onChange={(e) =>
                                            mutate(
                                                {
                                                    ...data,
                                                    projectDescription:
                                                        e.target.value,
                                                },
                                                false
                                            )
                                        }
                                    />
                                </div>
                                <div className={styles['input-container']}>
                                    {edit ? (
                                        <TextField
                                            label='Линк/ове към GitHub хранилище/а:'
                                            value={data.projectLinks || ''}
                                            InputProps={{
                                                readOnly: !edit,
                                            }}
                                            onChange={(e) =>
                                                mutate(
                                                    {
                                                        ...data,
                                                        projectLinks:
                                                            e.target.value,
                                                    },
                                                    false
                                                )
                                            }
                                        />
                                    ) : (
                                        <Typography>
                                            Линк/ове към GitHub хранилище/а:{' '}
                                            {data.projectLinks &&
                                                data.projectLinks
                                                    .split(/[ ,]+/)
                                                    .map((link, i) => (
                                                        <Link
                                                            className={
                                                                styles[
                                                                    'repo-link'
                                                                ]
                                                            }
                                                            key={i}
                                                            href={link}
                                                            rel='noopener noreferrer'
                                                            target='_blank'
                                                        >
                                                            {link}
                                                        </Link>
                                                    ))}
                                        </Typography>
                                    )}
                                </div>
                                <div className={styles['input-container']}>
                                    <Typography style={{ marginTop: '0' }}>
                                        Потвърден:{' '}
                                        {data.verified ? (
                                            <strong
                                                style={{
                                                    color: '#00e676',
                                                }}
                                            >
                                                Да
                                            </strong>
                                        ) : (
                                            <strong
                                                style={{
                                                    color: '#f50057',
                                                }}
                                            >
                                                Не
                                            </strong>
                                        )}
                                    </Typography>
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['tech-container']}`}
                                >
                                    {!edit &&
                                        projectTech &&
                                        projectTech.map((item, index) => (
                                            <Chip
                                                className={styles.tech}
                                                key={index}
                                                clickable
                                                style={getBeautifulColor(
                                                    item.color
                                                )}
                                                label={item.name}
                                            />
                                        ))}
                                    {edit &&
                                        tech &&
                                        tech.map((item, index) => (
                                            <Chip
                                                className={`${styles.tech} ${
                                                    projectTech
                                                        .map(
                                                            (tech) => tech.name
                                                        )
                                                        .includes(item.name)
                                                        ? 'selected-tech'
                                                        : ''
                                                }`}
                                                key={index}
                                                onClick={(e) =>
                                                    handleTech(e, item.color)
                                                }
                                                style={getBeautifulColor(
                                                    item.color
                                                )}
                                                label={item.name}
                                            />
                                        ))}
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
                                        form='edit-team'
                                    >
                                        {edit ? 'Запази' : 'Редактирай'}
                                    </Button>
                                    {!edit ? (
                                        <>
                                            <Button
                                                className={styles.delete}
                                                disableElevation
                                                variant='contained'
                                                onClick={() => setDialog(true)}
                                            >
                                                Изтрий отбора
                                            </Button>
                                            <Dialog
                                                open={dialog}
                                                onClose={() => setDialog(false)}
                                            >
                                                <DialogTitle>
                                                    Сигурни ли сте, че искате да
                                                    изтриете отбора?
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText></DialogContentText>
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
                                                currentTech();
                                                mutate();
                                            }}
                                        >
                                            Отказ
                                        </Button>
                                    )}
                                </div>
                            </CardActions>
                        </Card>
                    </Grow>
                ) : (
                    'loading'
                )}
                <Container
                    className={styles['user-container']}
                    disableGutters
                    maxWidth={false}
                >
                    {projectUsers &&
                        projectUsers.map((user) => (
                            <Grow in>
                                <Card className={styles['user-card']}>
                                    <CardHeader
                                        className={
                                            user.isLeader
                                                ? styles['card-header']
                                                : ''
                                        }
                                        avatar={
                                            <Avatar>
                                                {user.name.charAt(0)}
                                            </Avatar>
                                        }
                                        title={`${user.name} ${user.surname}`}
                                        subheader={
                                            user.isLeader
                                                ? 'Капитан'
                                                : 'Участник'
                                        }
                                    />
                                </Card>
                            </Grow>
                        ))}
                </Container>
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

Team.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
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
            if (!doc.data().team) {
                if (typeof window === 'undefined') {
                    ctx.res.writeHead(302, { Location: '/' });
                    ctx.res.end();
                } else {
                    Router.push('/');
                }
            } else {
                let tech = await firebase.firestore().collection('tech').get();
                let team = await doc.data().team.get();
                return {
                    tech: tech.docs.map((tag) => tag.data()),
                    team: {
                        id: team.id,
                        name: team.data().name,
                        projectName: team.data().projectName,
                        projectDescription: team.data().projectDescription,
                        projectLinks: team.data().projectLinks,
                    },
                };
            }
        }
    }
    return {};
};

export default Team;
