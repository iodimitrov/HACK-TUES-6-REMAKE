import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Avatar,
    Typography,
    Chip,
    Grow,
    Box,
} from '@material-ui/core';
import { EmojiEvents } from '@material-ui/icons';
import styles from 'styles/Winners.module.scss';

const Winners = () => {
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

    const winners = [
        {
            place: 'first',
            participants:
                'Боян Иванов, Мирослав Мирчев, Ангел Пенчев, Богдан Миронов, Симеон Георгиев',
            name: 'FAnton',
            project:
                'DRUN - Автоматизирана система за доставка на пратки с дронове.',
            image:
                'https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/winners%2Fht6-1.jpg?alt=media&token=30f5f8d9-b49f-40e5-9d1f-b49f6db4120d',
        },
        {
            place: 'second',
            participants:
                'Илиана Генова, Венелин Атанасов, Боряна Стефанова, Стефан Антонов, Иваело Кръстев',
            name: '789',
            project:
                'Пейо - преработено радио на около 60 години, така че да използва нови технологии',
            image:
                'https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/winners%2Fht6-2.jpg?alt=media&token=f1532b71-7489-4596-a679-0940cc786efd',
        },
        {
            place: 'third',
            participants:
                'Анета Цветкова, Калин Дойчев, Костадин Костадинов, Евгени Димов',
            name: 'Нишки',
            project:
                'NotInfo - браузър разширение за Chrome, коeто следи дали съдържание, което човек чете не е пропаганда.',
            image:
                'https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/winners%2Fht6-3.jpg?alt=media&token=9cd472a2-988c-4e55-87c9-c231a965875c',
        },
    ];

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Победители &#8226; HackTUES</title>
                <meta
                    name='description'
                    content='Победители на хакатона Hack TUES 6'
                ></meta>
            </Head>
            <Navbar />
            <Container maxWidth='lg'>
                <Grow in>
                    <Container
                        disableGutters
                        className={styles['card-container']}
                    >
                        {winners &&
                            winners.map((winner, i) => (
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
            </Container>
            <Footer />
        </Container>
    );
};

export default Winners;
