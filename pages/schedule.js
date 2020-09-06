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
import { Room, Laptop } from '@material-ui/icons';
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
                                <strong>18:00</strong> - Официално откриване на
                                събитието
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>18:15</strong> до{' '}
                                <strong>19:00</strong> - *Образователна лекция
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>19:15</strong> до{' '}
                                <strong>20:30</strong> - *Образователна лекция
                                (онлайн)
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>19:15</strong> до{' '}
                                <strong>20:30</strong> - *Образователни уъркшопи
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
                    <CardContent className={styles['card-content']}>
                        <Typography
                            component='em'
                            style={{
                                marginBottom: '8px',
                                display: 'inline-block',
                            }}
                        >
                            *Очаквайте повече детайли скоро!
                        </Typography>
                    </CardContent>
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
                                Работа по проектите
                                <br />
                            </Typography>
                        </Typography>
                    </CardContent>
                    <CardActions className={styles['card-actions']}>
                        <Chip
                            icon={<Laptop />}
                            color='secondary'
                            label='Онлайн'
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
                                Работа по проектите
                                <br />
                            </Typography>
                        </Typography>
                    </CardContent>
                    <CardActions className={styles['card-actions']}>
                        <Chip
                            icon={<Laptop />}
                            color='secondary'
                            label='Онлайн'
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
                                Работа по проектите
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>17:00</strong> до{' '}
                                <strong>18:00</strong> - Презентация на тема
                                “Как да презентираме проектите си”
                                <br />
                            </Typography>
                            <Typography component='li'>
                                <strong>23:59:59</strong> - Краен срок за
                                качване в GitHub на финалната версия на
                                проектите
                                <br />
                            </Typography>
                        </Typography>
                    </CardContent>
                    <CardActions className={styles['card-actions']}>
                        <Chip
                            icon={<Laptop />}
                            color='secondary'
                            label='Онлайн'
                            component='a'
                            target='_blank'
                            rel='noopener'
                            href='https://goo.gl/maps/pfY4KzmY2QfD6vCx5'
                            clickable
                        />
                    </CardActions>
                </Card>
            </Grow>
            <Grow in timeout={500}>
                <Card className={styles.card}>
                    <CardHeader
                        avatar={<Avatar>5</Avatar>}
                        className={styles['card-header']}
                        title='10.10.2020 г.'
                        subheader='Събота'
                    />
                    <Divider />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Провеждане на четвърт- и полуфинали (графикът
                                предстои да се уточни)
                                <br />
                            </Typography>
                        </Typography>
                    </CardContent>
                    <CardActions className={styles['card-actions']}>
                        <Chip
                            icon={<Laptop />}
                            color='secondary'
                            label='Онлайн'
                            component='a'
                            target='_blank'
                            rel='noopener'
                            href='https://goo.gl/maps/pfY4KzmY2QfD6vCx5'
                            clickable
                        />
                    </CardActions>
                </Card>
            </Grow>
            <Grow in timeout={550}>
                <Card className={styles.card}>
                    <CardHeader
                        avatar={<Avatar>6</Avatar>}
                        className={styles['card-header']}
                        title='11.10.2020 г.'
                        subheader='Неделя'
                    />
                    <Divider />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                от <strong>10:30</strong> до{' '}
                                <strong>13:30</strong> - Финали
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        от <strong>10:30</strong> до{' '}
                                        <strong>11:50</strong> - първа част
                                        <br />
                                    </Typography>
                                    <Typography component='li'>
                                        от <strong>11:50</strong> до{' '}
                                        <strong>12:10</strong> - почивка
                                        <br />
                                    </Typography>
                                    <Typography component='li'>
                                        от <strong>12:10</strong> до{' '}
                                        <strong>13:30</strong> - втора част
                                        <br />
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component='li'>
                                от <strong>13:30</strong> до{' '}
                                <strong>15:00</strong> - Заседание на журито за
                                излъчване на победители
                                <br />
                            </Typography>
                            <Typography component='li'>
                                от <strong>15:00</strong> до{' '}
                                <strong>16:00</strong> - Церемония по
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
                    <CardContent className={styles['card-content']}>
                        <Typography
                            component='em'
                            style={{
                                marginBottom: '8px',
                                display: 'inline-block',
                            }}
                        >
                            *Програмата подлежи на промени.
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
        </Container>
        <Footer />
    </Container>
);

export default Schedule;
