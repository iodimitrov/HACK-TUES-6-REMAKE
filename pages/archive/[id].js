import { useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CardActions,
    Button,
    Avatar,
    Typography,
    Chip,
    Grow,
    Box,
    Collapse,
} from '@material-ui/core';
import { EmojiEvents, People, Person } from '@material-ui/icons';
import CountUp from 'react-countup';
import styles from 'styles/Archive.module.scss';
import data from 'public/archive.json';

const Archive = (props) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const teamPlace = (place) => {
        if (place === 'first') {
            return (
                <Chip
                    icon={
                        <EmojiEvents
                            style={{
                                backgroundColor: '#e6ae17',
                                color: 'white',
                                borderRadius: '50em',
                                padding: '3px',
                            }}
                        />
                    }
                    style={{
                        backgroundColor: '#ffbb00',
                        color: 'white',
                        textShadow: '0px 0px 3px rgba(0,0,0,0.5)',
                    }}
                    label='Първо място'
                    className={styles['card-chip']}
                    onClick={() => {}}
                />
            );
        } else if (place === 'second') {
            return (
                <Chip
                    avatar={<Avatar>2</Avatar>}
                    label='Второ място'
                    className={styles['card-chip']}
                    onClick={() => {}}
                />
            );
        } else if (place === 'third') {
            return (
                <Chip
                    avatar={
                        <Avatar
                            style={{
                                backgroundColor: '#774828',
                                color: 'white',
                            }}
                        >
                            3
                        </Avatar>
                    }
                    label='Трето място'
                    style={{ backgroundColor: '#9e6034', color: 'white' }}
                    className={styles['card-chip']}
                    onClick={() => {}}
                />
            );
        }
        return;
    };

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Архив &#8226; HackTUES</title>
                <meta
                    name='description'
                    content='Архив за предишните издания на хакатона HackTUES'
                ></meta>
            </Head>
            <Navbar />
            <Container maxWidth='lg'>
                <Grow in>
                    <Container
                        disableGutters
                        className={styles['card-container']}
                    >
                        {props.winners &&
                            props.winners.map((winner, i) => (
                                <Card className={styles.card} key={i}>
                                    {teamPlace(winner.place)}
                                    {winner.image && (
                                        <CardMedia
                                            className={styles['card-media']}
                                            image={winner.image}
                                            title={winner.name}
                                        />
                                    )}
                                    <CardContent
                                        className={styles['card-content']}
                                    >
                                        <CardHeader
                                            className={styles['card-header']}
                                            title={winner.name}
                                        />
                                        <br />
                                        <Typography component='p'>
                                            <strong>Участници:</strong>{' '}
                                            {winner.participants}
                                        </Typography>
                                        <br />
                                        <Typography component='p'>
                                            <strong>Проект:</strong>{' '}
                                            {winner.project}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                    </Container>
                </Grow>
                <Grow in timeout={350}>
                    <Container className={styles['stats-container']}>
                        <div>
                            <CountUp end={props.allParticipants} />
                            <Person
                                style={{
                                    top: '-16px',
                                    position: 'absolute',
                                    fontSize: '163px',
                                    opacity: '0.05',
                                }}
                            />
                            <span>Участници</span>
                        </div>
                        <div>
                            <CountUp end={props.teams} />
                            <People
                                style={{
                                    top: '-25px',
                                    position: 'absolute',
                                    fontSize: '182px',
                                    opacity: '0.05',
                                }}
                            />
                            <span>Отбора</span>
                        </div>
                        <div>
                            <CountUp end={props.valuedProjects} />
                            <EmojiEvents
                                style={{
                                    top: '1px',
                                    position: 'absolute',
                                    fontSize: '135px',
                                    opacity: '0.05',
                                }}
                            />
                            <span>Отличени проекта</span>
                        </div>
                    </Container>
                </Grow>
                <Grow in timeout={400}>
                    <Container
                        disableGutters
                        className={styles['description-container']}
                    >
                        <Card className={styles.card}>
                            <Box className={styles['card-uppersection']}>
                                <CardHeader
                                    className={styles['card-header']}
                                    title='За събитието'
                                />
                                <CardActions
                                    className={styles['card-actions']}
                                    disableSpacing
                                >
                                    <Button
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label='show more'
                                        disableElevation
                                        color='primary'
                                        variant='contained'
                                    >
                                        {expanded
                                            ? 'Прочети по-малко'
                                            : 'Прочети повече'}
                                    </Button>
                                </CardActions>
                            </Box>
                            <Collapse
                                in={expanded}
                                timeout='auto'
                                collapsedHeight={200}
                            >
                                <CardContent className={styles['card-content']}>
                                    <Typography
                                        dangerouslySetInnerHTML={{
                                            __html: props.description,
                                        }}
                                    />
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Container>
                </Grow>
            </Container>
            <Footer />
        </Container>
    );
};

export const getStaticPaths = async () => {
    const paths = data.map((data) => ({
        params: { id: data.id },
    }));

    return { paths, fallback: false };
};

export const getStaticProps = async (ctx) => {
    const currData = data.find((data) => data.id === ctx.params.id);
    return {
        props: currData,
    };
};

export default Archive;
