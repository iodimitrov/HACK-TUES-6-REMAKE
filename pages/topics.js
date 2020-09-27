import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
} from '@material-ui/core';
import {
    Eco,
    Commute,
    Forum,
    Home,
    SportsEsports,
    Warning,
} from '@material-ui/icons';
import styles from 'styles/Topics.module.scss';

const Topics = () => {
    return (
        <Container maxWidth={false}>
            <Head>
                <title>Теми &#8226; HackTUES</title>
                <meta name='description' content='Темите в HackTUES'></meta>
            </Head>
            <Navbar />
            <Container
                maxWidth={false}
                className={styles.content}
                disableGutters
            >
                <Card className={`${styles['card']} ${styles['main-card']}`}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Smart City'
                    />
                    <CardContent className={styles['card-content']}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </CardContent>
                </Card>
                <Card className={styles['card']}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Smart Energy'
                    />
                    <CardContent
                        className={`${styles['card-content']} ${styles['icon-content']}`}
                    >
                        <Eco />
                    </CardContent>
                    <CardContent className={styles['card-content']}>
                        <Typography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Както
                            жилищните, така и търговските сгради в smart
                            градовете са по-ефективни, когато използват по-малко
                            енергия, за която се събират и анализират данни.
                            Акцентът на темата е енергията и начините, по които
                            употребата ѝ от хората може да бъде оптимизирана.
                            Бъдете креативни, пестете енергия от всяко нещо, за
                            което се сетите!
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={styles['card']}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Smart Transportation'
                    />
                    <CardContent
                        className={`${styles['card-content']} ${styles['icon-content']}`}
                    >
                        <Commute />
                    </CardContent>
                    <CardContent className={styles['card-content']}>
                        <Typography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Начините
                            за по-ефективно придвижване в града са нещо, с което
                            ежедневно се сблъскваме. Целта тук е да се улесни
                            градската мобилност, следенето на трафика,
                            пътуването с автомобил, паркирането и всяко нещо,
                            свързано с транспорта, дори това да е придвижването
                            пеша или с велосипед.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={styles['card']}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Smart Communication'
                    />
                    <CardContent
                        className={`${styles['card-content']} ${styles['icon-content']}`}
                    >
                        <Forum />
                    </CardContent>
                    <CardContent className={styles['card-content']}>
                        <Typography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Цели
                            се всеки да получи достъп до информация, която би го
                            накарала да се почувства като част от града и
                            обществото. Темата подтиква към това на всеки човек
                            да са му предоставени различни възможности за
                            комуникация - от това да знае какви събития се
                            случват около него в реално време, до това как да се
                            включва в дискусии на важни теми с други граждани.
                            Често се случва и хората да не оценяват мястото, на
                            което живеят, защото не са запознати с предимствата
                            му като град и неговите забележителности. Вие можете
                            да промените това!
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={styles['card']}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Smart Home'
                    />
                    <CardContent
                        className={`${styles['card-content']} ${styles['icon-content']}`}
                    >
                        <Home />
                    </CardContent>
                    <CardContent className={styles['card-content']}>
                        <Typography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;В
                            smart града всички домове използват IoT технологии.
                            По този начин човек може ефективно да се възползва
                            от много функционалности. Създайте подобни
                            функционалности и осигурете повече комфорт и
                            достъпност.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={styles['card']}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Smart City Game'
                    />
                    <CardContent
                        className={`${styles['card-content']} ${styles['icon-content']}`}
                    >
                        <SportsEsports />
                    </CardContent>
                    <CardContent className={styles['card-content']}>
                        <Typography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Да
                            се разработи игра, в която играчът може да се потопи
                            в Smart атмосферата, като например City building
                            игра, която позволява да се развие Smart град, или
                            RPG (role-playing game) тип игра, която те вкарва в
                            един бъдещ Smart град.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={styles['card']}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Coronavirus'
                    />
                    <CardContent
                        className={`${styles['card-content']} ${styles['icon-content']}`}
                    >
                        <Warning />
                    </CardContent>
                    <CardContent className={styles['card-content']}>
                        <Typography>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Да
                            се разработи софтуерно или хардуерно решение, което
                            да помогне обществото в справянето с COVID-19. Да се
                            разработи:
                            <Typography component='ul'>
                                <Typography component='li'>
                                    проект, който има за цел да подпомогне
                                    здравната система на държава в справянето с
                                    COVID-19 случаите;
                                </Typography>
                                <Typography component='li'>
                                    проект, който има за цел да олекоти
                                    кризисното положение, което се очаква да
                                    настъпи заради икономическото застояване,
                                    причинено от COVID-19;
                                </Typography>
                                <Typography component='li'>
                                    проект, който има за цел да подпомогне
                                    образователната система в кризисни ситуации;
                                </Typography>
                                <Typography component='li'>
                                    проект, който има за цел да разнообрази
                                    ежедневието под карантина.
                                </Typography>
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </Container>
    );
};

export default Topics;
