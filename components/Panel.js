import { useState, useEffect } from 'react';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
    Card,
    CardHeader,
    Backdrop,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    Chip,
    Button,
    Snackbar,
    CircularProgress,
    Link as MuiLink,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Link from 'components/Link';
import styles from 'styles/Panel.module.scss';
import firebase from 'firebase/app';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { getBeautifulColor } from 'utils/functions';

const Teams = (props) => {
    const { data } = useCollection('teams', {
        listen: true,
    });

    const { data: users } = useCollection('users', {
        listen: true,
    });

    const [emails, setEmails] = useState([]);
    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        (async () => {
            if (users) {
                setEmails(
                    await Promise.all(
                        users
                            .filter((user) => user.team)
                            .map(async (user) => {
                                let res = await fetch(
                                    `/api/retrieveuser?userId=${user.id}`
                                );
                                let retrievedUser = await res.json();
                                return retrievedUser.email;
                            })
                    )
                );
            }
        })();
    }, []);

    const getContestantsInfo = async () => {
        setBackdrop(true);
        let rows = [
            [
                'име',
                'клас',
                'имейл',
                'телефон',
                'отбор',
                'капитан',
                'тениска',
                'яде ли месо',
                'алергии',
                'уъркшоп',
                'изцяло онлайн',
            ],
        ];
        let currEmails = [];
        let teams = [];

        for (const user of users) {
            let res = await fetch(`/api/retrieveuser?userId=${user.id}`);
            let retrievedUser = await res.json();
            currEmails.push(retrievedUser.email);
            if (user.team) {
                let teamDoc = await user.team.get();
                teams.push(teamDoc.data().name || 'няма');
            } else {
                teams.push('няма');
            }
        }

        users.forEach((user, i) => {
            rows.push([
                `${user.name} ${user.surname}`,
                user.grade,
                currEmails[i],
                user.phone,
                teams[i],
                user.isLeader ? 'да' : 'не',
                user.tshirt,
                user.meat ? 'да' : 'не',
                user.allergies,
                user.workshop ? user.workshop : 'не',
                user.online ? 'да' : 'не',
            ]);
        });

        let tsvContent =
            'data:text/tab-separated-values;charset=utf-8,' +
            rows.map((e) => e.join('\t')).join('\n');

        let encodedUri = encodeURI(tsvContent);
        let link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'users_data.tsv');
        document.body.appendChild(link);

        link.click();
        setBackdrop(false);
    };

    const getProjectsInfo = async () => {
        setBackdrop(true);
        let rows = [['отбор', 'име на проект', 'описание']];

        data.forEach((team) => {
            rows.push([team.name, team.projectName, team.projectDescription]);
        });

        let tsvContent =
            'data:text/tab-separated-values;charset=utf-8,' +
            rows.map((e) => e.join('\t')).join('\n');

        let encodedUri = encodeURI(tsvContent);
        let link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'projects_data.tsv');
        document.body.appendChild(link);

        link.click();
        setBackdrop(false);
    };

    return (
        <Container maxWidth={false}>
            <Navbar />
            <Container maxWidth='sm' className={styles.content} disableGutters>
                <Card className={styles['tshirts-card']}>
                    <CardContent className={styles['card-content']}>
                        <div>
                            Тениски <strong>S</strong>:{' '}
                            {users &&
                                users.filter(
                                    (user) => user.team && user.tshirt === 'S'
                                ).length}
                        </div>
                        <div>
                            Тениски <strong>M</strong>:{' '}
                            {users &&
                                users.filter(
                                    (user) => user.team && user.tshirt === 'M'
                                ).length}
                        </div>
                        <div>
                            Тениски <strong>L</strong>:{' '}
                            {users &&
                                users.filter(
                                    (user) => user.team && user.tshirt === 'L'
                                ).length}
                        </div>
                        <div>
                            Тениски <strong>XL</strong>:{' '}
                            {users &&
                                users.filter(
                                    (user) => user.team && user.tshirt === 'XL'
                                ).length}
                        </div>
                        <div>
                            Тениски <strong>2XL</strong>:{' '}
                            {users &&
                                users.filter(
                                    (user) => user.team && user.tshirt === '2XL'
                                ).length}
                        </div>
                        <div>
                            Брой <strong>потвърдени</strong> отбори:{' '}
                            {data &&
                                data.filter((team) => team.verified).length}
                        </div>
                        <div>
                            Брой{' '}
                            <strong>
                                <span style={{ color: 'red' }}>не</span>
                                потвърдени
                            </strong>{' '}
                            отбори:{' '}
                            {data &&
                                data.filter((team) => !team.verified).length}
                        </div>
                        <div>Общ брой отбори: {data && data.length}</div>
                    </CardContent>
                </Card>
                <br />
                <Accordion className={styles['allergies-accordion']}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>
                            <strong>
                                Kак да създам съвременно уеб приложение за 10
                                минути
                            </strong>
                            :{' '}
                            {users &&
                                users.filter(
                                    (user) =>
                                        user.workshop ===
                                        'Kак да създам съвременно уеб приложение за 10 минути'
                                ).length}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles['accordion-details']}>
                        {users &&
                            users
                                .filter(
                                    (user) =>
                                        user.workshop ===
                                        'Kак да създам съвременно уеб приложение за 10 минути'
                                )
                                .map((user) => (
                                    <div>{`${user.name} ${user.surname} (${user.grade})`}</div>
                                ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion className={styles['allergies-accordion']}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>
                            <strong>Embedded за начинаещи</strong>:{' '}
                            {users &&
                                users.filter(
                                    (user) =>
                                        user.workshop ===
                                        'Embedded за начинаещи'
                                ).length}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles['accordion-details']}>
                        {users &&
                            users
                                .filter(
                                    (user) =>
                                        user.workshop ===
                                        'Embedded за начинаещи'
                                )
                                .map((user) => (
                                    <div>{`${user.name} ${user.surname} (${user.grade})`}</div>
                                ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion className={styles['allergies-accordion']}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>
                            <strong>Embedded за напреднали</strong>:{' '}
                            {users &&
                                users.filter(
                                    (user) =>
                                        user.workshop ===
                                        'Embedded за напреднали'
                                ).length}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles['accordion-details']}>
                        {users &&
                            users
                                .filter(
                                    (user) =>
                                        user.workshop ===
                                        'Embedded за напреднали'
                                )
                                .map((user) => (
                                    <div>{`${user.name} ${user.surname} (${user.grade})`}</div>
                                ))}
                    </AccordionDetails>
                </Accordion>
                <br />
                <Accordion className={styles['allergies-accordion']}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>Брой участници</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles['accordion-details']}>
                        <div>
                            Участници от <strong>9А</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '9А')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>9Б</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '9Б')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>9В</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '9В')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>9Г</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '9Г')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>10А</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '10А')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>10Б</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '10Б')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>10В</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '10В')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>10Г</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '10Г')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>11А</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '11А')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>11Б</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '11Б')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>11В</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '11В')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>11Г</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '11Г')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>12А</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '12А')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>12Б</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '12Б')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>12В</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '12В')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>12Г</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '12Г')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>2020А</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '2020А')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>2020Б</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '2020Б')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>2020В</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '2020В')
                                    .length}
                        </div>
                        <div>
                            Участници от <strong>2020Г</strong>:{' '}
                            {users &&
                                users.filter((user) => user.grade === '2020Г')
                                    .length}
                        </div>
                        <div>
                            Участници в отбори:{' '}
                            {users && users.filter((user) => user.team).length}
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={styles['emails-accordion']}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>Имейли на участници в отбори</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles['accordion-details']}>
                        {emails && emails.length > 0
                            ? emails.map((email) => <span>{email} </span>)
                            : 'loading...'}
                    </AccordionDetails>
                </Accordion>
                <Accordion className={styles['allergies-accordion']}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>
                            Хора с алергии (игнорираме простотиите)
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles['accordion-details']}>
                        {users &&
                            users
                                .filter((user) => user.allergies)
                                .map((user) => (
                                    <div>{`${user.name} ${user.surname} (${user.grade}) - ${user.allergies}`}</div>
                                ))}
                    </AccordionDetails>
                </Accordion>
                <Accordion className={styles['allergies-accordion']}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>
                            Изцяло онлайн:{' '}
                            {users &&
                                users.filter((user) => user.online).length}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles['accordion-details']}>
                        {users &&
                            users
                                .filter((user) => user.online)
                                .map((user) => (
                                    <div>{`${user.name} ${user.surname} (${user.grade})`}</div>
                                ))}
                    </AccordionDetails>
                </Accordion>{' '}
                <br />
                <Card className={styles['csv-card']}>
                    <CardActions className={styles['card-actions']}>
                        <Button
                            variant='contained'
                            color='primary'
                            disableElevation
                            onClick={getContestantsInfo}
                        >
                            Изтегли TSV с инфо за&nbsp;
                            <strong>участниците</strong>
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            disableElevation
                            onClick={getProjectsInfo}
                        >
                            Изтегли TSV с инфо за&nbsp;
                            <strong>проектите</strong>
                        </Button>
                    </CardActions>
                </Card>
                <Backdrop open={backdrop} style={{ zIndex: '9999' }}>
                    <CircularProgress color='primary' />
                </Backdrop>
            </Container>
            <Footer />
        </Container>
    );
};

export default Teams;
