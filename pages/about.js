import { Container, Typography, Link, Grow } from '@material-ui/core';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import styles from 'styles/About.module.scss';

const About = () => (
  <Container maxWidth={false}>
    <Head>
      <title>За хакатона &#8226; HackTUES</title>
      <meta
        name='description'
        content='HackTUES е първият и единствен по рода си хакатон в България, организиран от ученици за ученици от Технологично училище „Електронни системи“ към ТУ - София'
      ></meta>
    </Head>
    <Navbar />
    <Grow in>
      <Container className={styles.content} disableGutters maxWidth='md'>
        <Typography>
          <span className={styles.hacktues}>Hack</span>
          <span className={styles.hacktues}>TUES</span> е първият и единствен по
          рода си хакатон в България, организиран от ученици за ученици.
          Събитието стартира през 2015г. като инициатива на ученици от{' '}
          <Link href='http://tues.bg' target='_blank' rel='noopener'>
            Технологично училище „Електронни системи“ към ТУ - София
          </Link>
          , като 5 издания по-късно, Hack TUES е вече едно от ключовите събития
          за училището. В хакатона могат да участват само ученици от ТУЕС в
          отбори с три до пет участници, които в рамките на два дни създават от
          нулата свой ИТ проект по зададена тема и след това го представят пред
          професионално жури от преподаватели и ИТ специалисти.
          <br />
          <br />
          Хакатонът дава възможност на учениците да усъвършенстват уменията си
          по програмиране, работа в екип и презентация на готовия проект. Те се
          срещат с ментори от реалния ИТ бизнес, като понякога тези познанства
          прерастват в предложения за практика и стаж. <br />
          <br />
          Всяка година Hack TUES се организира от координационен екип доброволци
          от 11-ти клас, който се грижи за цялостната организация на събитието
          под менторството на АЗТУЕС и ръководството на ТУЕС.
          <br />
          <br />
          <strong>Поради</strong> наложеното извънредно положение в страната
          заради COVID-19 пандемията, тазгодишното издание на Hack TUES 6,
          първоначално планирано за 12-15 март, се отлага за 1-11 октомври.
        </Typography>
      </Container>
    </Grow>
    <Footer />
  </Container>
);

export default About;
