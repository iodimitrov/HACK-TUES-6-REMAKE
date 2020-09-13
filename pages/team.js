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
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import styles from 'styles/Team.module.scss';
import firebase from 'firebase/app';
import cookies from 'next-cookies';
import { useDocument, useCollection } from '@nandorojo/swr-firestore';
import Router, { useRouter } from 'next/router';
import { getBeautifulColor } from 'utils/functions';
import { useUser } from 'utils/auth/useUser';

const Team = (props) => {
    const router = useRouter();
    const { user: currUser, logout } = useUser();
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

    const { data: users } = useCollection('users', {
        where: ['team', '==', null],
        listen: true,
    });

    const [nameError, setNameError] = useState(false);
    const [projectTech, setProjectTech] = useState([]);
    const [projectUsers, setProjectUsers] = useState([]);
    const [newUsers, setNewUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [isLeader, setIsLeader] = useState(false);
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        currentUsers();
        currentTech();
    }, [data.projectUsers]);

    const currentUsers = () => {
        if (data.projectUsers) {
            Promise.all(
                data.projectUsers.map(async (user) => {
                    let doc = await user.get();
                    if (currUser && currUser.id === user.id) {
                        setIsLeader(doc.data().isLeader);
                    }
                    return { ...doc.data(), id: doc.id };
                })
            ).then((users) => setProjectUsers(users));
        }
    };

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
                    projectUsers:
                        newUsers.length > 0
                            ? firebase.firestore.FieldValue.arrayUnion(
                                  ...newUsers.map((user) =>
                                      firebase
                                          .firestore()
                                          .doc(`users/${user.id}`)
                                  )
                              )
                            : data.projectUsers,
                    verified: projectUsers.length + newUsers.length > 2,
                });
                newUsers.forEach(async (user) => {
                    await firebase
                        .firestore()
                        .doc(`users/${user.id}`)
                        .update({
                            team: firebase.firestore().doc(`teams/${data.id}`),
                            updatedAt: new Date().toJSON(),
                        });
                });
                setNewUsers([]);
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

    const handleDeletion = () => {
        fetch('/api/deleteteam')
            .then(() => {
                router.replace('/');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const removeUser = (userId) => {
        setBackdrop(true);
        fetch('/api/removeuserteam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then(() => {
                setBackdrop(false);
                if (userId === currUser.id) {
                    router.replace('/');
                }
            })
            .catch((error) => {
                setBackdrop(false);
                setError(error.message);
            });
    };

    const makeLeader = (userId) => {
        setBackdrop(true);
        fetch('/api/makeleader', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then(() => {
                setBackdrop(false);
                router.reload();
            })
            .catch((error) => {
                setBackdrop(false);
                setError(error.message);
            });
    };

    const parseOption = (value) => {
        let data = value.split(',');
        return { fullName: data[0], grade: data[1], id: data[2] };
    };

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
                                {edit && (
                                    <div className={styles['input-container']}>
                                        <Autocomplete
                                            multiple
                                            noOptionsText="Няма хорица :'("
                                            filterSelectedOptions
                                            options={users
                                                .filter(
                                                    (user) =>
                                                        user.id !== currUser.id
                                                )
                                                .map(
                                                    (user) =>
                                                        `${user.name} ${user.surname},${user.grade},${user.id}`
                                                )}
                                            renderOption={(option, state) => {
                                                const data = parseOption(
                                                    option
                                                );
                                                return (
                                                    <div className='search-option'>
                                                        <p>{data.fullName}</p>
                                                        <p>{data.grade}</p>
                                                    </div>
                                                );
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label='Добави участници'
                                                    helperText='Търсете по име и/или фамилия'
                                                />
                                            )}
                                            renderTags={(value, getTagProps) =>
                                                value.map((tag, index) => {
                                                    let data = parseOption(tag);
                                                    return (
                                                        <Chip
                                                            {...getTagProps({
                                                                index,
                                                            })}
                                                            label={`${data.fullName} - ${data.grade}`}
                                                        />
                                                    );
                                                })
                                            }
                                            value={
                                                newUsers.map(
                                                    (user) =>
                                                        `${user.fullName},${user.grade},${user.id}`
                                                ) || ''
                                            }
                                            onChange={(event, value) =>
                                                setNewUsers(
                                                    value.map((user) =>
                                                        parseOption(user)
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                )}
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
                            {isLeader && (
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
                                                    onClick={() =>
                                                        setDialog(true)
                                                    }
                                                >
                                                    Изтрий отбора
                                                </Button>
                                                <Dialog
                                                    open={dialog}
                                                    onClose={() =>
                                                        setDialog(false)
                                                    }
                                                >
                                                    <DialogTitle>
                                                        Сигурни ли сте, че
                                                        искате да изтриете
                                                        отбора?
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
                                                                setDialog(
                                                                    false
                                                                );
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
                            )}
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
                        projectUsers.map((user, index) => (
                            <Grow in key={index}>
                                <Card
                                    className={`${styles['user-card']} ${styles['card']}`}
                                >
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
                                    {currUser && (
                                        <CardActions
                                            className={styles['card-actions']}
                                            disableSpacing
                                        >
                                            <div
                                                className={
                                                    styles['input-container']
                                                }
                                            >
                                                {currUser.id !== user.id &&
                                                    isLeader && (
                                                        <>
                                                            <Button
                                                                disableElevation
                                                                type='submit'
                                                                color='secondary'
                                                                variant='contained'
                                                                onClick={() =>
                                                                    makeLeader(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Направи капитан
                                                            </Button>
                                                            <Button
                                                                disableElevation
                                                                type='submit'
                                                                color='primary'
                                                                variant='contained'
                                                                className={
                                                                    styles.delete
                                                                }
                                                                onClick={() =>
                                                                    removeUser(
                                                                        user.id
                                                                    )
                                                                }
                                                            >
                                                                Премахни
                                                            </Button>
                                                        </>
                                                    )}
                                                {currUser.id === user.id &&
                                                    !user.isLeader && (
                                                        <Button
                                                            disableElevation
                                                            type='submit'
                                                            color='primary'
                                                            variant='contained'
                                                            className={
                                                                styles.delete
                                                            }
                                                            onClick={() =>
                                                                removeUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            Напусни
                                                        </Button>
                                                    )}
                                            </div>
                                        </CardActions>
                                    )}
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
                <Backdrop open={backdrop} style={{ zIndex: '9999' }}>
                    <CircularProgress color='primary' />
                </Backdrop>
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
