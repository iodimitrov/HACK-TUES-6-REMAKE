import {
    Container,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grow,
} from '@material-ui/core';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import styles from 'styles/Regulation.module.scss';

const Regulation = () => (
    <Container maxWidth={false}>
        <Head>
            <title>Регламент &#8226; HackTUES</title>
            <meta name='description' content='Регламент на HackTUES'></meta>
        </Head>
        <Navbar />
        <Container disableGutters maxWidth='lg'>
            <Grow in>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Отговорност'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Участниците са длъжни да спазват Правилника за
                                вътрешния ред на София Тех Парк по време на
                                хакатона.
                            </Typography>
                            <Typography component='li'>
                                Организаторите на събитието не носят отговорност
                                за щети, нанесени от участниците, върху базата
                                на София Тех Парк и техниката на ТУЕС и София
                                Тех Парк по време на хакатона.
                            </Typography>
                            <Typography component='li'>
                                При нанесени материални щети, участниците са
                                длъжни да ги възстановят.
                            </Typography>
                            <Typography component='li'>
                                Участниците са длъжни да се съобразяват с
                                програмата на провеждане на хакатона (откриване,
                                време за работа, почивки, представяне пред
                                журито и др.), както и да спазват указанията на
                                организаторите.
                            </Typography>
                            <Typography component='li'>
                                Не се допускат външни лица по време на хакатона
                                с изключение на финалния ден (неделя).
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={350}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Регистрация'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                В хакатона могат да участват само и единствено
                                настоящи ученици на ТУЕС.
                            </Typography>
                            <Typography component='li'>
                                Регистрацията за събитието става чрез системата
                                в сайта.
                            </Typography>
                            <Typography component='li'>
                                Организаторите не гарантират, че всички желаещи
                                ще имат възможността да участват. След достигане
                                на лимита за места, регистрацията на отбори и
                                индивидуални участници ще бъде спряна.
                            </Typography>
                            <Typography component='li'>
                                Участниците могат да участват в отбори от 3 до 5
                                човека и имат правото сами да съставят отборите
                                си.
                            </Typography>
                            <Typography component='li'>
                                Организаторите не гарантират, че индивидуални
                                участници ще могат да си намерят отбор. Ако до{' '}
                                <strong>25.09</strong> не са намерили отбор,
                                няма да могат да участвате на хакатона
                                независимо дали са се регистрирали като
                                индивидуален участник или не.
                            </Typography>
                            <Typography component='li'>
                                Всеки индивидуален участник може да участва само
                                в един отбор.
                            </Typography>
                            <Typography component='li'>
                                До участие в хакатона няма да бъдат допускани
                                ученици под 18 години без предадена декларация
                                за съгласие от родител в срока и на мястото,
                                обявено на сайта на HackTUES 6.
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={400}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Проекти'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Проектите трябва да се придържат към темите на
                                събитието. Темите и подтемите, по които
                                участниците могат да работят ще бъдат обявени 4
                                дни преди началото на хакатона. Отборите сами
                                избират подтемата, по която ще работят.
                            </Typography>
                            <Typography component='li'>
                                Проектите са интелектуална собственост на
                                участниците, но е задължително всеки отбор да
                                съхранява кода на проекта си в GitHub в публично
                                хранилище (линк към което са предали при
                                създаване на отбор) по време на събитието.
                            </Typography>
                            <Typography component='li'>
                                Версии на кода трябва да се качват на публично
                                хранилище по време на хакатона, като последната
                                версия трябва да е качена до{' '}
                                <strong>08:59:59</strong> на{' '}
                                <strong>04.10.2020</strong>.
                            </Typography>
                            <Typography component='li'>
                                Embedded проектите е препоръчително да качат
                                принципна електрическа схема в хранилището си.
                                Няма изисквания за схемата - може да бъде
                                реализирана дигитално (например - на KiCad) или
                                на лист.
                            </Typography>
                            <Typography component='li'>
                                Задължително е всеки отбор да има презентация
                                под някаква форма (PowerPoint, видео или др.),
                                която да се води по предварително зададен
                                темплейт, който включва всички изисквания за
                                презентацията.
                            </Typography>
                            <Typography component='li'>
                                За Software проектите е препоръчително да се
                                сложи структура на проекта в темплейта
                                (Препоръчително е графика или блок схема).
                            </Typography>
                            <Typography component='li'>
                                За Hardware проектите е препоръчително да се
                                сложи принципна електрическа схема.
                            </Typography>
                            <Typography component='li'>
                                След изтичане на времето за работене по
                                проектите, embedded проектите не бива да бъдат
                                променяни по какъвто и да е начин (нито
                                хардуерно, нито софтуерно) освен ако не се е
                                счупила дадена хардуерна част непосредствено
                                преди представянето. В такъв случай капитанът на
                                отбора е длъжен да уведоми някого от
                                организаторите преди отборът да променя каквото
                                и да е по конструкцията/механиката/частите на
                                проекта.
                            </Typography>
                            <Typography component='li'>
                                <strong>
                                    Задължително е при представянето всеки отбор
                                    да има презентация за проекта си.
                                </strong>
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={450}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Техника и технологии'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Лаптопи, софтуер, хардуер и други активи,
                                необходими за проекта, се осигуряват от
                                участниците.
                            </Typography>
                            <Typography component='li'>
                                Технологиите, езиците за програмиране и
                                инструментите за разработка са по избор на
                                участниците.
                            </Typography>
                            <Typography component='li'>
                                Позволено е използването на всякакви езици за
                                програмиране, технологии и инструменти за
                                разработка, всякакви платформи с отворен лиценз,
                                както и всякакви инструменти за графичен дизайн,
                                анимация, видео обработка и хардуерна разработка
                                и всякакви хардуерни устройства: телефони,
                                таблети, микроконтролери, компоненти и други.
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={500}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Оценяване от менторите'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Всеки отбор ще получи оценка от специален
                                ментор, който отговаря за този отбор.
                            </Typography>
                            <Typography component='li'>
                                Оценката се поставя на базата на следния
                                критерии:
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        техническа трудност - Труден за
                                        постигане ли е даденият проект в рамките
                                        на хакатона? Използват ли се неща за
                                        напреднали програмисти или е по-скоро
                                        проект за начинаещи?
                                    </Typography>
                                    <Typography component='li'>
                                        работа в екип - Разпределят ли се
                                        равномерно задачите в отбора? Сработват
                                        ли се участниците помежду си?
                                    </Typography>
                                    <Typography component='li'>
                                        качествен код/хардуер
                                    </Typography>
                                    <Typography component='li'>
                                        реализация - Каква част от проекта е
                                        завършена и работи? Ако отборът не е
                                        довършил проекта, то каква част е
                                        направена?
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component='li'>
                                Оценката на менторите ще се използва за
                                разпределяне на отборите в 3-те полуфинала на
                                хакатона и избор на “Финалист на менторите”.
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={550}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Оценяване от участниците'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Тази година всеки участник в хакатона ще има
                                правото да гласува веднъж за любимия си отбор.
                                Гласуването{' '}
                                <strong>
                                    ще се извършва от профила на участника в
                                    сайта на Hack TUES и ще е отворено по време
                                    на полуфиналите.
                                </strong>
                                Отборът с най-много гласове отива на финалите
                                като “Финалист на публиката”, независимо от
                                мястото си в класацията на полуфиналите.
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={600}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Оценяване от журито'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Ако проектът не е по темата, няма да бъде
                                допуснат до финали и в класацията ще се
                                отбележи, че не е бил по темата
                            </Typography>
                            <Typography component='li'>
                                <strong>
                                    <u>Идея</u> - какво е искал да направи
                                    отборът: (0 - 2 т.)
                                </strong>
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        Доколко проектът е по темата?
                                    </Typography>
                                    <Typography component='li'>
                                        Оригинална ли е идеята - има ли много
                                        подобни идеи или не?
                                    </Typography>
                                    <Typography component='li'>
                                        Доколко е приложима идеята - може ли да
                                        се използва в действителност?
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component='li'>
                                <strong>
                                    <u>Функционалност</u> - какво е успял да
                                    реализира отборът (0 - 3 т.)
                                </strong>
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        Обхват - какви функционалности има
                                        проектът?
                                    </Typography>
                                    <Typography component='li'>
                                        Доколко реализираните функционалности
                                        позволяват, проектът да се използва по
                                        предназначение?
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component='li'>
                                <strong>
                                    <u>Реализация</u> - колко добре е реализиран
                                    проектът (0 - 10 т.)
                                </strong>
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        Каква част от проекта е завършена?
                                    </Typography>
                                    <Typography component='li'>
                                        Качествена разработка - добре ли е
                                        разработен проектът (качествен код и
                                        добър хардуер)?
                                    </Typography>
                                    <Typography component='li'>
                                        Организация (структура) на проекта -
                                        виждат ли се ясно отделните елементи в
                                        проекта и връзките между тях?
                                    </Typography>
                                    <Typography component='li'>
                                        Удобен ли е да се адаптира и надгражда
                                        проектът - могат ли лесно да се правят
                                        промени и да се добавят нови елементи?
                                    </Typography>
                                    <Typography component='li'>
                                        До колко е удобен за употреба (user
                                        experience)?
                                    </Typography>
                                    <Typography component='li'>
                                        Работа в екип - разпределени ли са
                                        задачите според индивидуалните
                                        възможности на всеки от екипа?
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component='li'>
                                <strong>
                                    <u>Презентация</u> - колко добре е
                                    представен проектът пред журито (0 - 5 т.)
                                </strong>
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        Засегнати ли са въпросите от темплейта -
                                        учениците ще получат темплейт, в който е
                                        показано какво е задължително да включат
                                        в презентацията си.
                                    </Typography>
                                    <Typography component='li'>
                                        Презентиране:
                                        <Typography component='ul'>
                                            <Typography component='li'>
                                                Екипът подготвен ли е за
                                                презентиране?
                                            </Typography>
                                            <Typography component='li'>
                                                Отговаря ли на въпросите на
                                                журито или се опитва да ги
                                                избегне?
                                            </Typography>
                                        </Typography>
                                    </Typography>
                                </Typography>
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={650}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Провеждане на полуфинали и финали'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                В неделя (04.10.) всеки отбор ще представи своя
                                проект пред жури (съставено от преподаватели в
                                ТУЕС, ТУЕС алумни, представители на
                                компаниите-спонсори и специалисти в IT бранша).
                            </Typography>
                            <Typography component='li'>
                                Отборите ще бъдат разделени в 3 полуфинала на
                                базата на менторските оценки. Всеки отбор ще има
                                по 5 минути за представяне на проекта си и 5
                                минути да отговори на въпроси от журито.
                            </Typography>
                            <Typography component='li'>
                                До финал ще достигнат 8 отбора:
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        Отборите класирани на първо и второ
                                        място във всеки полуфинал (общо 6)
                                    </Typography>
                                    <Typography component='li'>
                                        1 “Финалист на менторите” - отборът с
                                        най-висока менторска оценка от
                                        класираните на 3-то място във всеки
                                        полуфинал
                                    </Typography>
                                    <Typography component='li'>
                                        1 “Финалист на публиката” - отборът
                                        получил най-много гласове на публиката,
                                        който не е вече сред избраните от журито
                                        и менторите финалисти.
                                    </Typography>
                                </Typography>
                            </Typography>
                            <Typography component='li'>
                                Най-добрите 3 проекта от финалите ще бъдат
                                наградени съответно с 1-во, 2-ро и 3-то място.
                            </Typography>
                            <Typography component='li'>
                                На финала времето за задаване на въпроси на
                                журито ще бъде увеличено колкото е нужно.
                            </Typography>
                            <Typography component='li'>
                                Ще бъде показана класация на отборите:
                                <Typography component='ul'>
                                    <Typography component='li'>
                                        обща класация за финалистите
                                    </Typography>
                                    <Typography component='li'>
                                        отделни класации за всеки един
                                        полуфинал.
                                    </Typography>
                                </Typography>
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={700}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Дисквалификация'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Ако журито сметне, че даден проект не е
                                авторски, съответният отбор може да бъде
                                дисквалифициран.
                            </Typography>
                            <Typography component='li'>
                                Организаторите на събитието може да
                                дисквалифицират участник, ако поведението на
                                участника е непристойно или пречи на
                                провеждането на хакатона.
                            </Typography>
                            <Typography component='li'>
                                Организаторите си запазват правото да
                                дисквалифицират отбор ако проектът им не е
                                подходящ за събитието, има неморално съдържание
                                или зловредна цел.
                            </Typography>
                            <Typography component='li'>
                                До участие в хакатона няма да бъдат допускани
                                лица във видимо нетрезво състояние.
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
            <Grow in timeout={750}>
                <Card className={styles.card}>
                    <CardHeader
                        className={styles['card-header']}
                        title='Тормоз'
                    />
                    <CardContent className={styles['card-content']}>
                        <Typography component='ul'>
                            <Typography component='li'>
                                Не се толерира тормоз над екипа на HackTUES,
                                доброволците или участниците в събитието, под
                                каквато и да е форма.
                            </Typography>
                            <Typography component='li'>
                                Ако сте подложен на тормоз, забележите, че някой
                                друг е подложен на тормоз, или имате някакви
                                други проблеми, моля свържете се с член от екипа
                                на хакатона незабавно.
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </Grow>
        </Container>
        <Footer />
    </Container>
);

export default Regulation;
