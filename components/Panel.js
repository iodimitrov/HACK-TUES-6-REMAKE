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
    TextField,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Link from 'components/Link';
import styles from 'styles/Panel.module.scss';
import firebase from 'firebase/app';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { getBeautifulColor } from 'utils/functions';

const Panel = () => {
    const { data, mutate } = useCollection('teams', {
        listen: true,
    });

    const { data: users } = useCollection('users', {
        listen: true,
    });

    const [backdrop, setBackdrop] = useState(false);
    const [teams, setTeams] = useState([]);
    const [success, setSuccess] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
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
            ).then((teams) => {
                setTeams(teams);
            });
        }
    }, [data]);

    const getContestantsInfo = async () => {
        setBackdrop(true);
        let rows = [
            [
                'ид',
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
        let teams = [];
        for (const user of users) {
            if (user.team) {
                let teamDoc = await firebase
                    .firestore()
                    .doc(`teams/${user.team.id}`)
                    .get();
                teams.push(teamDoc.data().name);
            } else {
                teams.push('няма');
            }
        }

        users.forEach((user, i) => {
            rows.push([
                user.id,
                `${user.name} ${user.surname}`,
                user.grade,
                user.email,
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

    const getDiscordInfo = async () => {
        setBackdrop(true);
        let rows = [];

        teams.forEach((team) => {
            rows.push([
                team.id,
                team.name,
                ...team.projectUsers.map((user) => user.email),
            ]);
        });

        let csvContent =
            'data:text/csv;charset=utf-8,' +
            rows.map((e) => e.join(',')).join('\n');

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'discord_data.csv');
        document.body.appendChild(link);

        link.click();
        setBackdrop(false);
    };

    const editScores = async () => {
        if (!edit) {
            setEdit(true);
        } else {
            setBackdrop(true);
            let i = 0;
            for (const doc of data) {
                await firebase
                    .firestore()
                    .doc(`teams/${doc.id}`)
                    .update({
                        scoreSemiFinal: parseInt(data[i].scoreSemiFinal),
                        scoreFinal: parseInt(data[i].scoreFinal),
                    });
                i++;
            }
            setEdit(false);
            setBackdrop(false);
        }
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
                                .map((user, i) => (
                                    <div
                                        key={i}
                                    >{`${user.name} ${user.surname} (${user.grade})`}</div>
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
                                .map((user, i) => (
                                    <div
                                        key={i}
                                    >{`${user.name} ${user.surname} (${user.grade})`}</div>
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
                                .map((user, i) => (
                                    <div
                                        key={i}
                                    >{`${user.name} ${user.surname} (${user.grade})`}</div>
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
                        {users &&
                            users.map((user, i) => (
                                <span key={i}>{user.email} </span>
                            ))}
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
                                .map((user, i) => (
                                    <div
                                        key={i}
                                    >{`${user.name} ${user.surname} (${user.grade}) - ${user.allergies}`}</div>
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
                                .map((user, i) => (
                                    <div
                                        key={i}
                                    >{`${user.name} ${user.surname} (${user.grade})`}</div>
                                ))}
                    </AccordionDetails>
                </Accordion>{' '}
                <Accordion className={styles['allergies-accordion']}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>Гласове на потребителите</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={styles['accordion-details']}>
                        {data &&
                            data
                                .sort((a, b) => (a.votes < b.votes ? 1 : -1))
                                .map((team, i) => (
                                    <div
                                        key={i}
                                    >{`${team.name} - ${team.votes}`}</div>
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
                        <Button
                            variant='contained'
                            disableElevation
                            onClick={getDiscordInfo}
                        >
                            Изтегли CSV с инфо за&nbsp;
                            <strong>Дискорд</strong>
                        </Button>
                    </CardActions>
                </Card>
                <Button
                    style={{ marginTop: '20px', width: '100%' }}
                    className={`${styles.edit} ${
                        edit ? styles['is-editing'] : ''
                    }`}
                    disableElevation
                    type='submit'
                    color='primary'
                    variant='contained'
                    onClick={editScores}
                >
                    {edit ? 'Запази' : 'Редактирай'}
                </Button>
                <Backdrop open={backdrop} style={{ zIndex: '9999' }}>
                    <CircularProgress color='primary' />
                </Backdrop>
            </Container>
            <br />
            <Container
                maxWidth={false}
                className={styles['teams-container']}
                disableGutters
            >
                {teams
                    ? teams.map((team, i) => (
                          <Card key={i} className={styles.card}>
                              <CardHeader
                                  underline='none'
                                  component={Link}
                                  href='/team/[id]'
                                  as={`/team/${team.id}`}
                                  avatar={
                                      <Avatar>{team.name.charAt(0)}</Avatar>
                                  }
                                  className={styles['card-header']}
                                  title={`${team.name}`}
                                  subheader={`${team.id}`}
                              />
                              <CardContent
                                  underline='none'
                                  component={Link}
                                  href='/team/[id]'
                                  as={`/team/${team.id}`}
                                  className={styles['card-content']}
                              >
                                  <div className={styles['data-container']}>
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
                                                          label={tech.name}
                                                      />
                                                  )
                                          )}
                                  </div>
                                  <div className={styles['data-container']}>
                                      <Typography>
                                          <strong>Участници</strong>
                                      </Typography>
                                      {team.projectUsers &&
                                          team.projectUsers.map(
                                              (user, i) =>
                                                  user && (
                                                      <Typography
                                                          style={{
                                                              backgroundColor: user.isLeader
                                                                  ? 'lightgreen'
                                                                  : 'transparent',
                                                          }}
                                                          key={i}
                                                      >{`${user.name} ${user.surname} - ${user.grade} (${user.email})`}</Typography>
                                                  )
                                          )}
                                  </div>
                              </CardContent>
                              <CardActions className={styles['card-actions']}>
                                  <TextField
                                      fullWidth
                                      label='Точки на полуфинал'
                                      defaultValue={team.scoreSemiFinal}
                                      type='number'
                                      InputProps={{
                                          readOnly: !edit,
                                      }}
                                      onChange={(e) => {
                                          data[i].scoreSemiFinal =
                                              e.target.value;
                                      }}
                                  />
                                  <TextField
                                      fullWidth
                                      label='Точки на финал'
                                      defaultValue={team.scoreFinal}
                                      type='number'
                                      InputProps={{
                                          readOnly: !edit,
                                      }}
                                      onChange={(e) => {
                                          data[i].scoreFinal = e.target.value;
                                      }}
                                  />
                              </CardActions>
                          </Card>
                      ))
                    : 'loading...'}
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

export default Panel;
