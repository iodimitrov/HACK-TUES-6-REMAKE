import {
    Container,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Chip,
    Divider,
    Avatar,
    Grow,
    Typography,
} from '@material-ui/core';
import { Room } from '@material-ui/icons';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import styles from 'styles/Schedule.module.scss';

const Schedule = () => (
    <Container maxWidth={false}>
        <Head>
            <title>Програма &#8226; HackTUES</title>
            <meta
                name='description'
                content='HackTUES е първият и единствен по рода си хакатон в България, организиран от ученици за ученици от Технологично училище „Електронни системи“ към ТУ - София'
            ></meta>
        </Head>
        <Navbar />
        <Container disableGutters maxWidth='md'>
            <Grow in timeout={300}>
                <Card className={styles.card}>
                    <CardHeader
                        avatar={<Avatar>1</Avatar>}
                        className={styles['card-header']}
                        title='01.10.2020 г.'
                        subheader='Четвъртък'
                    />
                    <Divider />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                от <strong>17:30</strong> до{' '}
                                <strong>19:00</strong> - Посрещане, регистриране
                                и настаняване по стаи на участниците
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>19:00</strong> до{' '}
                                <strong>19:45</strong> - Откриване на събитието
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>19:45</strong> до{' '}
                                <strong>21:00</strong> - Време за обсъждане по
                                стаите
                                <br />
                            </Typography>
                        </Typography>
                    </CardContent>
                    <CardActions className={styles['card-actions']}>
                        <Chip
                            icon={<Room />}
                            color='secondary'
                            label='София Тех Парк'
                            component='a'
                            target='_blank'
                            rel='noopener'
                            href='https://goo.gl/maps/pfY4KzmY2QfD6vCx5'
                            clickable
                        />
                    </CardActions>
                </Card>
            </Grow>
            <Grow in timeout={350}>
                <Card className={styles.card}>
                    <CardHeader
                        avatar={<Avatar>2</Avatar>}
                        className={styles['card-header']}
                        title='02.10.2020 г.'
                        subheader='Петък'
                    />
                    <Divider />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                от <strong>8:00</strong> - Начало на първи
                                работен ден
                                <br />
                            </Typography>
                            <Typography component='li'>
                                <strong>11:00</strong> - Кратка закуска
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>14:00</strong> до{' '}
                                <strong>15:30</strong> - Обедна почивка
                                <br />
                            </Typography>
                            <Typography component='li'>
                                до <strong>21:00</strong> - Край на първи
                                работен ден
                                <br />
                            </Typography>
                        </Typography>
                    </CardContent>
                    <CardActions className={styles['card-actions']}>
                        <Chip
                            icon={<Room />}
                            color='secondary'
                            label='София Тех Парк'
                            component='a'
                            target='_blank'
                            rel='noopener'
                            href='https://goo.gl/maps/pfY4KzmY2QfD6vCx5'
                            clickable
                        />
                    </CardActions>
                </Card>
            </Grow>
            <Grow in timeout={400}>
                <Card className={styles.card}>
                    <CardHeader
                        avatar={<Avatar>3</Avatar>}
                        className={styles['card-header']}
                        title='03.10.2020 г.'
                        subheader='Събота'
                    />
                    <Divider />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                от <strong>8:00</strong> - Начало на втори
                                работен ден
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>12:00</strong> до{' '}
                                <strong>13:30</strong> - Обедна почивка
                                <br />
                            </Typography>
                            <Typography component='li'>
                                <strong>16:00</strong> - Кратка закуска
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>17:30</strong> до{' '}
                                <strong>18:30</strong> - Презентация на тема
                                “Как да презентираме проектите си”
                                <br />
                                (По един представител на отбор, задължително)
                            </Typography>
                            <Typography component='li'>
                                до <strong>21:00</strong> - Край на втори
                                работен ден
                                <br />
                            </Typography>
                        </Typography>
                    </CardContent>
                    <CardActions className={styles['card-actions']}>
                        <Chip
                            icon={<Room />}
                            color='secondary'
                            label='София Тех Парк'
                            component='a'
                            target='_blank'
                            rel='noopener'
                            href='https://goo.gl/maps/pfY4KzmY2QfD6vCx5'
                            clickable
                        />
                    </CardActions>
                </Card>
            </Grow>
            <Grow in timeout={450}>
                <Card className={styles.card}>
                    <CardHeader
                        avatar={<Avatar>4</Avatar>}
                        className={styles['card-header']}
                        title='04.10.2020 г.'
                        subheader='Неделя'
                    />
                    <Divider />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                от <strong>8:00</strong> до{' '}
                                <strong>9:00</strong> - Финализиране на
                                проектите <br />
                            </Typography>
                            <Typography component='li'>
                                <strong>9:00</strong> - Краен срок за качване в
                                GitHub на финалната версия на проектите
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>9:30</strong> до{' '}
                                <strong>13:45</strong> - Полуфинали (след всеки
                                5 отбора ще следва почивка)
                                <br />
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        полуфинали част 1 -{' '}
                                        <strong>9:30</strong> до{' '}
                                        <strong>11:00</strong>
                                    </Typography>
                                    <Typography component='li'>
                                        първа почивка - <strong>11:00</strong>{' '}
                                        до <strong>11:15</strong>
                                    </Typography>
                                    <Typography component='li'>
                                        полуфинали част 2 -{' '}
                                        <strong>11:15</strong> до{' '}
                                        <strong>12:30</strong>
                                    </Typography>
                                    <Typography component='li'>
                                        втора почивка - <strong>12:30</strong>{' '}
                                        до <strong>12:45</strong>
                                    </Typography>
                                    <Typography component='li'>
                                        полуфинали част 3 -{' '}
                                        <strong>12:45</strong> до{' '}
                                        <strong>14:00</strong>
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component='li'>
                                от <strong>14:00</strong> до{' '}
                                <strong>15:00</strong> - Обедна почивка и
                                заседание на журито на полуфиналите
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>15:00</strong> до{' '}
                                <strong>15:20</strong> - Излъчване на финалисти
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>15:30</strong> до{' '}
                                <strong>18:30</strong> - Финали
                                <br />
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        първа част - <strong>15:30</strong> до{' '}
                                        <strong>16:50</strong>
                                    </Typography>
                                    <Typography component='li'>
                                        почивка - <strong>16:50</strong> до{' '}
                                        <strong>17:10</strong>
                                    </Typography>
                                    <Typography component='li'>
                                        втора част - <strong>17:10</strong> до{' '}
                                        <strong>18:30</strong>
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component='li'>
                                от <strong>18:30</strong> до{' '}
                                <strong>19:30</strong> - Заседание на журито за
                                излъчване на победители
                                <br />
                            </Typography>
                            <Typography component='li'>
                                <strong>19:30</strong> - Церемония по
                                награждаване
                                <br />
                            </Typography>
                        </Typography>
                    </CardContent>
                    <CardActions className={styles['card-actions']}>
                        <Chip
                            icon={<Room />}
                            color='secondary'
                            label='София Тех Парк'
                            component='a'
                            target='_blank'
                            rel='noopener'
                            href='https://goo.gl/maps/pfY4KzmY2QfD6vCx5'
                            clickable
                        />
                    </CardActions>
                </Card>
            </Grow>
        </Container>
        <Footer />
    </Container>
);

export default Schedule;
