import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Chip,
    Button,
    Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Link from 'components/Link';
import styles from 'styles/Teams.module.scss';
import firebase from 'firebase/app';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { getBeautifulColor } from 'utils/functions';
import cookies from 'next-cookies';

const Teams = (props) => {
    const { data } = useCollection('teams', {
        listen: true,
    });

    const { data: user, update: updateUser } = useDocument(
        props.user ? `users/${props.user.id}` : null,
        {
            listen: true,
        }
    );

    const [teams, setTeams] = useState([]);
    const [showVerified, setShowVerified] = useState(true);
    const [voting, setVoting] = useState(false); //change to 'true' to activate the voting
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        document.onkeypress = (e) => {
            if (e.keyCode === 102 || e.keyCode === 1092) {
                window.open(
                    'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO',
                    '_blank'
                );
            }
        };
        if (data) {
            Promise.all(
                data.map(async (team) => {
                    let tech;
                    let users;
                    if (team.projectTech) {
                        tech = await Promise.all(
                            team.projectTech.map(async (tech) => {
                                if (typeof tech.get === 'function') {
                                    let doc = await tech.get();
                                    return doc.data();
                                }
                            })
                        );
                    }
                    if (team.projectUsers) {
                        users = await Promise.all(
                            team.projectUsers.map(async (user) => {
                                if (typeof user.get === 'function') {
                                    let doc = await user.get();
                                    return doc.data();
                                }
                            })
                        );
                    }
                    team.projectTech = tech;
                    team.projectUsers = users;
                    return team;
                })
            ).then((teams) => setTeams(teams));
        }
        return () => {
            document.onkeypress = (e) => {};
        };
    }, [data]);

    const vote = async (id) => {
        if (!user.votedFor && id && user.team.id !== id) {
            try {
                await firebase
                    .firestore()
                    .doc(`teams/${id}`)
                    .update({
                        votes: firebase.firestore.FieldValue.increment(1),
                    });
                await updateUser({
                    votedFor: firebase.firestore().doc(`teams/${id}`),
                });
                setSuccess('Успешно гласувахте!');
            } catch (e) {}
        }
        return false;
    };

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Отбори &#8226; HackTUES</title>
                <meta name='description' content='Отборите в HackTUES'></meta>
            </Head>
            <Navbar />
            <Container
                maxWidth={false}
                className={styles.caution}
                disableGutters
            >
                <Typography>
                    <strong style={{ color: 'red' }}>Внимание:</strong> На тази
                    страница се показват{' '}
                    <u>
                        {showVerified ? (
                            'само потвърдените'
                        ) : (
                            <span>
                                само <span style={{ color: 'red' }}>не</span>
                                потвърдените
                            </span>
                        )}
                    </u>{' '}
                    отбори!
                </Typography>
                {props.user && (
                    <Button
                        color='primary'
                        disableElevation
                        variant='contained'
                        onClick={() => setShowVerified(!showVerified)}
                    >
                        {showVerified
                            ? 'Покажи непотвърдените отбори'
                            : 'Покажи потвърдените отбори'}
                    </Button>
                )}
            </Container>
            <Container
                maxWidth={false}
                className={styles.content}
                disableGutters
            >
                {teams ? (
                    teams.filter((team) =>
                        showVerified ? team.verified : !team.verified
                    ).length > 0 ? (
                        teams
                            .filter((team) =>
                                showVerified ? team.verified : !team.verified
                            )
                            .map((team, i) => (
                                <Card key={i} className={styles.card}>
                                    <CardHeader
                                        underline='none'
                                        component={Link}
                                        href='/team/[id]'
                                        as={`/team/${team.id}`}
                                        avatar={
                                            <Avatar>
                                                {team.name.charAt(0)}
                                            </Avatar>
                                        }
                                        className={styles['card-header']}
                                        title={`${team.name}`}
                                        subheader='Отбор'
                                    />
                                    <CardContent
                                        underline='none'
                                        component={Link}
                                        href='/team/[id]'
                                        as={`/team/${team.id}`}
                                        className={styles['card-content']}
                                    >
                                        <div
                                            className={styles['data-container']}
                                        >
                                            <Typography>
                                                <strong>Технологии</strong>
                                            </Typography>
                                            {team.projectTech &&
                                                team.projectTech.map(
                                                    (tech, i) =>
                                                        tech && (
                                                            <Chip
                                                                className={
                                                                    styles.tech
                                                                }
                                                                key={i}
                                                                style={getBeautifulColor(
                                                                    tech.color
                                                                )}
                                                                label={
                                                                    tech.name
                                                                }
                                                            />
                                                        )
                                                )}
                                        </div>
                                        <div
                                            className={styles['data-container']}
                                        >
                                            <Typography>
                                                <strong>Участници</strong>
                                            </Typography>
                                            {team.projectUsers &&
                                                team.projectUsers.map(
                                                    (user, i) =>
                                                        user && (
                                                            <Typography
                                                                key={i}
                                                            >{`${user.name} ${user.surname} - ${user.grade}`}</Typography>
                                                        )
                                                )}
                                        </div>
                                    </CardContent>
                                    {voting && props.user && team.verified && (
                                        <CardActions
                                            className={styles['card-actions']}
                                        >
                                            <Button
                                                disabled={
                                                    user.votedFor ||
                                                    (user.team &&
                                                        user.team.id ===
                                                            team.id)
                                                }
                                                variant='contained'
                                                disableElevation
                                                color='primary'
                                                onClick={() => vote(team.id)}
                                            >
                                                Гласувай
                                            </Button>
                                        </CardActions>
                                    )}
                                </Card>
                            ))
                    ) : (
                        <Card className={styles.card}>
                            {showVerified ? (
                                <CardHeader
                                    className={styles['card-header']}
                                    title='Няма потвърдени отбори :O'
                                    subheader='press f to pay respects'
                                />
                            ) : (
                                <CardHeader
                                    className={styles['card-header']}
                                    title='Няма непотвърдени отбори :))'
                                    subheader='good'
                                />
                            )}
                        </Card>
                    )
                ) : (
                    <Card className={styles.card}>
                        <CardHeader
                            className={styles['card-header']}
                            title='Няма никакви отбори'
                        />
                    </Card>
                )}
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

Teams.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
    if (allCookies.auth) {
        return { user: allCookies.auth };
    }
    return {};
};

export default Teams;
