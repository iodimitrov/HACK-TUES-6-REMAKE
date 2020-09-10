import { useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    InputAdornment,
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

const CreateTeam = () => {
    const router = useRouter();
    const { data, add } = useCollection('teams', {
        listen: true,
    });

    const { data: users } = useCollection('users', {
        where: ['team', '==', null],
        listen: true,
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/\S/.test(name.value)) {
            setName({ value: name.value, error: 'Невалидно име' });
            return;
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
                        {users && (
                            <Autocomplete
                                multiple
                                noOptionsText="Няма хорица :'("
                                filterSelectedOptions
                                options={users.map(
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
                </form>
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
            }
        }
    }
    return {};
};

export default CreateTeam;
