import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { Container, Card, CardHeader, CardContent } from '@material-ui/core';
import { EmojiEvents } from '@material-ui/icons';
import styles from 'styles/Leaderboard.module.scss';
import { useCollection } from '@nandorojo/swr-firestore';

const Leaderboard = () => {
    const { data: finalists } = useCollection('teams', {
        where: ['finalist', '==', true],
        orderBy: ['scoreFinal', 'desc'],
        listen: true,
    });

    const { data: semiFinalistsLeft } = useCollection('teams', {
        where: ['semiFinalistsLeft', '==', true],
        orderBy: ['scoreSemiFinal', 'desc'],
        listen: true,
    });

    const { data: semiFinalistsRight } = useCollection('teams', {
        where: ['semiFinalistsLeft', '==', false],
        orderBy: ['scoreSemiFinal', 'desc'],
        listen: true,
    });

    const getStylePosition = (position, special) => {
        if (position === 1) {
            return 'first';
        } else if (position === 2) {
            return 'second';
        } else if (position === 3) {
            return 'third';
        } else if (special) {
            return 'special';
        }
        return;
    };

    return (
        <Container maxWidth={false}>
            <Head>
                <title>Класация &#8226; HackTUES</title>
                <meta name='description' content='Класация в HackTUES'></meta>
            </Head>
            <Navbar />
            {finalists && finalists.length > 0 && (
                <Container
                    className={`${styles.content} ${styles.finals}`}
                    maxWidth='lg'
                    disableGutters
                >
                    <Card className={styles.card}>
                        <CardHeader
                            className={styles['card-header']}
                            title='Финали'
                        />
                        <CardContent className={styles['card-content']}>
                            <div className={styles['data-container']}>
                                <div>
                                    <strong className={styles.position}>
                                        No.
                                    </strong>
                                    <strong className={styles.name}>Име</strong>
                                </div>
                                <strong className={styles.score}>Точки</strong>
                            </div>
                            {finalists.map((team, i) => (
                                <div
                                    className={`${styles['data-container']} ${
                                        styles[getStylePosition(0, null)]
                                    }`}
                                >
                                    <div>
                                        <span className={styles.position}>
                                            {i + 1 === 9999 ? (
                                                <EmojiEvents
                                                    style={{
                                                        verticalAlign: 'sub',
                                                    }}
                                                />
                                            ) : (
                                                i + 1
                                            )}
                                        </span>
                                        <span className={styles.name}>
                                            {team.name}
                                        </span>
                                    </div>
                                    <strong className={styles.score}>
                                        {team.scoreFinal}
                                    </strong>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </Container>
            )}
            <Container
                className={`${styles.content} ${styles['semi-finals']}`}
                maxWidth='lg'
                disableGutters
            >
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Полуфинали група 1'
                    />
                    <CardContent className={styles['card-content']}>
                        <div className={styles['data-container']}>
                            <div>
                                <strong className={styles.position}>No.</strong>
                                <strong className={styles.name}>Име</strong>
                            </div>
                            <strong className={styles.score}>Точки</strong>
                        </div>
                        {semiFinalistsLeft &&
                            semiFinalistsLeft.map((team, i) => (
                                <div
                                    className={`${styles['data-container']} ${
                                        styles[
                                            getStylePosition(
                                                i + 1,
                                                team.special
                                            )
                                        ]
                                    }`}
                                >
                                    <div>
                                        <span className={styles.position}>
                                            {i + 1}
                                        </span>
                                        <span className={styles.name}>
                                            {team.name}
                                        </span>
                                    </div>
                                    <strong className={styles.score}>
                                        {team.scoreSemiFinal}
                                    </strong>
                                </div>
                            ))}
                    </CardContent>
                </Card>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Полуфинали група 2'
                    />
                    <CardContent className={styles['card-content']}>
                        <div className={styles['data-container']}>
                            <div>
                                <strong className={styles.position}>No.</strong>
                                <strong className={styles.name}>Име</strong>
                            </div>
                            <strong className={styles.score}>Точки</strong>
                        </div>
                        {semiFinalistsRight &&
                            semiFinalistsRight.map((team, i) => (
                                <div
                                    className={`${styles['data-container']} ${
                                        styles[
                                            getStylePosition(
                                                i + 1,
                                                team.special
                                            )
                                        ]
                                    }`}
                                >
                                    <div>
                                        <span className={styles.position}>
                                            {i + 1}
                                        </span>
                                        <span className={styles.name}>
                                            {team.name}
                                        </span>
                                    </div>
                                    <strong className={styles.score}>
                                        {team.scoreSemiFinal}
                                    </strong>
                                </div>
                            ))}
                    </CardContent>
                </Card>
            </Container>
            <Footer />
        </Container>
    );
};

export default Leaderboard;
