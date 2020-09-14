import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Avatar,
    Chip,
} from '@material-ui/core';
import Link from 'components/Link';
import styles from 'styles/Teams.module.scss';
import { useCollection } from '@nandorojo/swr-firestore';
import { getBeautifulColor } from 'utils/functions';

const Teams = () => {
    const { data } = useCollection('teams', {
        listen: true,
    });

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        document.onkeypress = (e) => {
            if (e.keyCode === 102) {
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
    }, [data]);

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
                    страница се показват <u>само потвърдените</u> отбори!
                </Typography>
            </Container>
            <Container
                maxWidth={false}
                className={styles.content}
                disableGutters
            >
                {teams ? (
                    teams.filter((team) => team.verified).length > 0 ? (
                        teams
                            .filter((team) => team.verified)
                            .map((team, i) => (
                                <Card
                                    key={i}
                                    underline='none'
                                    component={Link}
                                    href='/team/[id]'
                                    as={`/team/${team.id}`}
                                    className={styles.card}
                                >
                                    <CardHeader
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
                                </Card>
                            ))
                    ) : (
                        <Card className={styles.card}>
                            <CardHeader
                                className={styles['card-header']}
                                title='Няма потвърдени отбори :O'
                                subheader='press f to pay respects'
                            />
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
            </Container>
            <Footer />
        </Container>
    );
};

export default Teams;
