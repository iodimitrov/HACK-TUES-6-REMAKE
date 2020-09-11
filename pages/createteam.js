import { useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grow,
    Snackbar,
    Chip,
} from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import styles from 'styles/CreateTeam.module.scss';
import firebase from 'firebase/app';
import cookies from 'next-cookies';
import { useCollection } from '@nandorojo/swr-firestore';
import Router, { useRouter } from 'next/router';
import { getBeautifulColor } from 'utils/functions';
import { useUser } from 'utils/auth/useUser';

const CreateTeam = (props) => {
    const router = useRouter();
    const { user: currUser } = useUser();

    const { data } = useCollection('teams', {
        listen: true,
    });

    const { data: users } = useCollection('users', {
        where: ['team', '==', null],
        listen: true,
    });

    const { data: tech } = useCollection('tech', {
        initialData: props.users,
    });

    const [name, setName] = useState({
        value: '',
        error: false,
    });
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectLinks, setProjectLinks] = useState('');
    const [projectUsers, setProjectUsers] = useState([]);
    const [projectTech, setProjectTech] = useState([]);
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const allUsers = users.map((user) => user.id);
        const currUsers = projectUsers.map((user) => user.id);
        const allTech = tech.map((tag) => tag.name);

        if (!/\S/.test(name.value)) {
            setName({ value: name.value, error: 'Невалидно име' });
            return;
        }

        if (data.map((team) => team.name).includes(name.value)) {
            setName({ value: name.value, error: 'Името вече е заето' });
            return;
        }

        if (currUsers.length > 4) {
            setError('Избрали сте твърде много участници');
            return;
        }

        if (!currUsers.every((user) => allUsers.includes(user))) {
            setError(
                'Избрали сте невалиден потребител или такъв, който вече има отбор'
            );
            return;
        }

        if (!projectTech.every((tag) => allTech.includes(tag))) {
            setError('Избрали сте невалидна технология');
            return;
        }

        firebase
            .firestore()
            .collection('teams')
            .add({
                name: name.value,
                projectDescription,
                projectName,
                projectLinks: projectLinks.split(/[ ,]+/),
                projectTech: projectTech.map((tech) =>
                    firebase.firestore().doc(`tech/${tech}`)
                ),
                projectUsers: [
                    ...projectUsers.map((user) =>
                        firebase.firestore().doc(`users/${user.id}`)
                    ),
                    firebase.firestore().doc(`users/${currUser.id}`),
                ],
                special: false,
                verified: currUsers.length >= 2,
                votes: 0,
                scoreFinal: 0,
                scoreSemiFinal: 0,
            })
            .then(async (doc) => {
                await firebase
                    .firestore()
                    .doc(`users/${currUser.id}`)
                    .update({
                        isLeader: true,
                        team: firebase.firestore().doc(`teams/${doc.id}`),
                    });
                projectUsers.forEach(async (user) => {
                    await firebase
                        .firestore()
                        .doc(`users/${user.id}`)
                        .update({
                            team: firebase.firestore().doc(`teams/${doc.id}`),
                        });
                });
                router.push('/');
            });
    };

    const handleTech = (e) => {
        const value = e.target.children[0].innerHTML;
        if (e.target.classList.contains('selected-tech')) {
            e.target.classList.remove('selected-tech');
            let temp = projectTech.filter((tech) => tech !== value);
            setProjectTech(temp);
        } else {
            e.target.classList.add('selected-tech');
            setProjectTech([...new Set([...projectTech, value])]);
        }
    };

    const parseOption = (value) => {
        let data = value.split(',');
        return { fullName: data[0], grade: data[1], id: data[2] };
    };

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Създай отбор &#8226; HackTUES</title>
                <meta
                    name='description'
                    content='Създай отбор в HackTUES'
                ></meta>
            </Head>
            <Navbar />
            <Container maxWidth='md' className={styles.content} disableGutters>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles['input-container']}>
                        <TextField
                            label='Име на отбора'
                            value={name.value}
                            error={name.error.length > 0}
                            helperText={name.error}
                            required
                            onChange={(e) =>
                                setName({
                                    value: e.target.value,
                                    error: false,
                                })
                            }
                        />
                        <TextField
                            label='Име на проекта'
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-container']}>
                        <TextField
                            label='Описание на проекта'
                            value={projectDescription}
                            multiline
                            rowsMax={5}
                            onChange={(e) =>
                                setProjectDescription(e.target.value)
                            }
                        />
                        <TextField
                            label='Линк/ове към GitHub хранилище/а'
                            value={projectLinks}
                            placeholder='https://github.com/facebook/react, https://github.com/mui-org/material-ui'
                            helperText='Може да ги разделите със запетаи ако са няколко :)'
                            onChange={(e) => setProjectLinks(e.target.value)}
                        />
                    </div>
                    <div className={styles['input-container']}>
                        {users && currUser && (
                            <Autocomplete
                                multiple
                                noOptionsText="Няма хорица :'("
                                filterSelectedOptions
                                options={users
                                    .filter((user) => user.id !== currUser.id)
                                    .map(
                                        (user) =>
                                            `${user.name} ${user.surname},${user.grade},${user.id}`
                                    )}
                                renderOption={(option, state) => {
                                    const data = parseOption(option);
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
                                                {...getTagProps({ index })}
                                                label={`${data.fullName} - ${data.grade}`}
                                            />
                                        );
                                    })
                                }
                                value={
                                    projectUsers.map(
                                        (user) =>
                                            `${user.fullName},${user.grade},${user.id}`
                                    ) || ''
                                }
                                onChange={(event, value) =>
                                    setProjectUsers(
                                        value.map((user) => parseOption(user))
                                    )
                                }
                            />
                        )}
                    </div>
                    <div
                        className={`${styles['input-container']} ${styles['tech-container']}`}
                    >
                        {tech &&
                            tech.map((item, index) => (
                                <Chip
                                    className={styles.tech}
                                    key={index}
                                    onClick={handleTech}
                                    style={getBeautifulColor(item.color)}
                                    label={item.name}
                                />
                            ))}
                    </div>
                    <div
                        className={`${styles['input-container']} ${styles['tech-container']}`}
                    >
                        <Button
                            className={styles.submit}
                            type='submit'
                            disableElevation
                            color='primary'
                            variant='contained'
                        >
                            Цък to create
                        </Button>
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
            </Container>
            <Footer />
        </Container>
    );
};

CreateTeam.getInitialProps = async (ctx) => {
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
            if (doc.data().team) {
                if (typeof window === 'undefined') {
                    ctx.res.writeHead(302, { Location: '/' });
                    ctx.res.end();
                } else {
                    Router.push('/');
                }
            } else {
                let tech = await firebase.firestore().collection('tech').get();
                return {
                    tech: tech.docs.map((tag) => tag.data()),
                };
            }
        }
    }
    return {};
};

export default CreateTeam;
