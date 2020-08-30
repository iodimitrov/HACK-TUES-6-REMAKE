import { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Logo from 'components/Logo';
import { Container, Box, Link, IconButton, Grow } from '@material-ui/core';
import Image from 'material-ui-image';
import {
    CalendarToday,
    Room,
    ChevronLeft,
    ChevronRight,
} from '@material-ui/icons';
import styles from 'styles/Index.module.scss';
import Timer from 'react-compound-timer';
import Carousel from 'nuka-carousel';
import firebase from 'firebase/app';
import initFirebase from 'utils/auth/initFirebase';

initFirebase();

const Index = () => {
    const [images, setImages] = useState([]);
    const [columns, setColumns] = useState(4);

    useEffect(() => {
        window.addEventListener('resize', detectColumns);
        detectColumns();
        (async () => {
            let images = await firebase
                .storage()
                .ref()
                .child('logos')
                .listAll();
            let images_urls = await Promise.all(
                images.items.map((itemRef) => itemRef.getDownloadURL())
            );
            setImages(images_urls);
        })();
    }, []);

    const detectColumns = () => {
        let columns = 4;
        if (window.matchMedia('(max-width: 375px)').matches) {
            columns = 1;
        } else if (window.matchMedia('(max-width: 650px)').matches) {
            columns = 2;
        } else if (window.matchMedia('(max-width: 990px)').matches) {
            columns = 3;
        }
        setColumns(columns);
    };

    const links = [
        'https://www.sap.com/bulgaria/index.html',
        'http://telebid-pro.com/',
        'https://www.experian.bg/',
        'https://www.facebook.com/vmwarebg/',
        'http://asteasolutions.com',
        'https://www.ithub.kaufland.bg/ ',
        'https://www.progress.com/',
        'http://www.scalefocus.com/',
        'https://bosch.io/corporate/about-us/bosch-sofia.html',
        'https://www.creative-assembly.com/home',
        'https://devrix.com/',
        'https://www.dopamine.bg/',
        'https://www.ubisoft.com/en-US/studio/sofia.aspx',
        'https://bulged.net/',
        'https://www.dominos.bg/',
        'http://www.comet.bg/',
        'http://www.cloudbalkan.com/',
        'https://galacticbanitsa.com/',
        'https://initlab.org/',
        'https://itstep.bg/',
        'https://ora.pm/',
        'https://purewater.bg/',
        'http://www.smartcom.bg/',
        'https://sofiatech.bg/',
    ];
    const names = [
        'sap',
        'telebid',
        'experian',
        'vmware',
        'astea',
        'ithub',
        'progress',
        'scalefocus',
        'bosch',
        'ca',
        'devrix',
        'dopamine',
        'ubisoft',
        'bulged',
        'dominos',
        'comet',
        'cloudbalkan',
        'galacticbanitsa',
        'initlab',
        'itstep',
        'ora',
        'purewater',
        'smartcom',
        'sofiatech',
    ];
    return (
        <Container maxWidth={false}>
            <Head>
                <title>Начало &#8226; Hack TUES</title>
                <meta property='og:title' content='Начало • Hack TUES' />
                <meta
                    property='og:image'
                    content='https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/ogwallpaper.png?alt=media&token=a81af347-17e4-4b9d-8663-f4170473ef2c'
                />
                <meta
                    property='og:description'
                    content='HackTUES е първият и единствен по рода си хакатон в България, организиран от ученици за ученици от Технологично училище „Електронни системи“ към ТУ - София'
                />
                <meta
                    name='description'
                    content='HackTUES е първият и единствен по рода си хакатон в България, организиран от ученици за ученици от Технологично училище „Електронни системи“ към ТУ - София'
                ></meta>
            </Head>
            <Navbar />
            <Container className={styles.content} disableGutters>
                <Grow in>
                    <Box className={styles['herosection']}>
                        <Logo />
                        <Timer
                            initialTime={
                                new Date('2020-10-01T19:00:00').getTime() -
                                new Date().getTime()
                            }
                            direction='backward'
                        >
                            <Box className={styles.timer}>
                                <div>
                                    <span>
                                        <Timer.Days />
                                    </span>
                                    <span>Дена</span>
                                </div>
                                <div>
                                    <span>
                                        <Timer.Hours />
                                    </span>
                                    <span>Часа</span>
                                </div>
                                <div>
                                    <span>
                                        <Timer.Minutes />
                                    </span>
                                    <span>Минути</span>
                                </div>
                                <div>
                                    <span>
                                        <Timer.Seconds />
                                    </span>
                                    <span>Секунди</span>
                                </div>
                            </Box>
                        </Timer>
                        <Box className={styles.date}>
                            <span>
                                <CalendarToday fontSize='large' />
                                1-4 октомври 2020
                            </span>
                            <span>
                                <Room fontSize='large' />
                                <Link
                                    target='_blank'
                                    rel='noopener'
                                    href='https://goo.gl/maps/pfY4KzmY2QfD6vCx5'
                                >
                                    София Тех Парк
                                </Link>
                            </span>
                        </Box>
                    </Box>
                </Grow>
                {images && images.length > 0 && (
                    <Grow in>
                        <Box className={styles['carousel-container']}>
                            <Box className={styles['carousel-status']}>
                                <span className={styles.alpha}>АЛФА</span>
                                <span className={styles.beta}>БЕТА</span>
                                <span className={styles.gamma}>ГАМА</span>
                                <span className={styles.partners}>
                                    ПАРТНЬОРИ
                                </span>
                            </Box>
                            <Carousel
                                enableKeyboardControls
                                autoplay
                                wrapAround
                                framePadding='20px 50px 0'
                                slidesToShow={columns}
                                renderBottomCenterControls={null}
                                renderCenterLeftControls={({
                                    previousSlide,
                                }) => (
                                    <IconButton
                                        style={{ color: 'black' }}
                                        onClick={previousSlide}
                                    >
                                        <ChevronLeft fontSize='large' />
                                    </IconButton>
                                )}
                                renderCenterRightControls={({ nextSlide }) => (
                                    <IconButton
                                        style={{ color: 'black' }}
                                        onClick={nextSlide}
                                    >
                                        <ChevronRight fontSize='large' />
                                    </IconButton>
                                )}
                                className={styles.carousel}
                            >
                                {images.map((image, i) => (
                                    <Link
                                        href={links[i]}
                                        target='_blank'
                                        rel='noopener'
                                        className={`${styles['image-link']} ${
                                            styles[names[i]]
                                        }`}
                                        key={i}
                                    >
                                        <Image src={image} alt={names[i]} />
                                    </Link>
                                ))}
                            </Carousel>
                        </Box>
                    </Grow>
                )}
            </Container>
            <Footer />
        </Container>
    );
};

export default Index;
