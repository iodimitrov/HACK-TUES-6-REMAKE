import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Chip,
  Button,
} from '@material-ui/core';
import styles from 'styles/Mentors.module.scss';
import firebase from 'firebase/app';
import 'firebase/storage';
import { useCollection } from '@nandorojo/swr-firestore';
import { getBeautifulColor } from 'utils/functions';

const Mentors = () => {
  const { data } = useCollection('mentors');

  const [mentors, setMentors] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data) {
      (async () => {
        let images = await firebase.storage().ref().child('mentors').listAll();
        let images_urls = await Promise.all(
          images.items.map((itemRef) => itemRef.getDownloadURL()),
        );
        setImages(images_urls);
      })();
      Promise.all(
        data.map(async (mentor) => {
          let tech;
          if (mentor.technologies) {
            tech = await Promise.all(
              mentor.technologies.map(async (tech) => {
                if (typeof tech.get === 'function') {
                  let doc = await tech.get();
                  return doc.data();
                }
              }),
            );
          }
          mentor.technologies = tech;
          return mentor;
        }),
      ).then((mentors) => setMentors(mentors));
    }
  }, [data]);

  const getMentorTrum = (trum) => {
    switch (trum) {
      case 'f1':
        return (
          <>
            <span>
              2.10 (<strong>Петък</strong>) - от
              <strong>10:00</strong> до
              <strong>14:00</strong>
            </span>
            <br />
          </>
        );
      case 'f2':
        return (
          <>
            <span>
              2.10 (<strong>Петък</strong>) - от
              <strong>15:00</strong> до
              <strong>19:00</strong>
            </span>
            <br />
          </>
        );
      case 's1':
        return (
          <>
            <span>
              3.10 (<strong>Събота</strong>) - от
              <strong>10:00</strong> до
              <strong>14:00</strong>
            </span>
            <br />
          </>
        );
      case 's2':
        return (
          <>
            <span>
              3.10 (<strong>Събота</strong>) - от
              <strong>15:00</strong> до
              <strong>19:00</strong>
            </span>
            <br />
          </>
        );
      case 'n1':
        return (
          <>
            <span>
              4.10 (<strong>Неделя</strong>) - от
              <strong>10:00</strong> до
              <strong>14:00</strong>
            </span>
            <br />
          </>
        );
      case 'n2':
        return (
          <>
            <span>
              4.10 (<strong>Неделя</strong>) - от
              <strong>15:00</strong> до
              <strong>19:00</strong>
            </span>
            <br />
          </>
        );
    }
  };

  return (
    <Container maxWidth={false}>
      <Head>
        <title>Ментори &#8226; HackTUES</title>
        <meta name='description' content='Менторите в HackTUES'></meta>
      </Head>
      <Navbar />
      <Container maxWidth={false} className={styles.content} disableGutters>
        {mentors &&
          mentors.map((mentor, i) => (
            <Card key={i} className={styles.card}>
              <CardHeader
                avatar={<Avatar srcSet={images[i]} src={images[i]} />}
                className={styles['card-header']}
                title={`${mentor.name}`}
                subheader={`${mentor.position} @ ${mentor.organization}`}
              />
              <CardContent className={styles['card-content']}>
                <div className={styles['data-container']}>
                  <Typography>
                    <strong>Технологии</strong>
                  </Typography>
                  {mentor.technologies &&
                    mentor.technologies.map(
                      (tech, i) =>
                        tech && (
                          <Chip
                            className={styles.tech}
                            key={i}
                            clickable
                            style={getBeautifulColor(tech.color)}
                            label={tech.name}
                          />
                        ),
                    )}
                </div>
                {mentor.interests && (
                  <div className={styles['data-container']}>
                    <Typography>
                      <strong>Интереси</strong>
                    </Typography>
                    <Typography>{mentor.interests}</Typography>
                  </div>
                )}
              </CardContent>
              <CardActions className={styles['card-actions']}>
                <div className={styles['data-container']}>
                  <Typography>
                    <strong>Присъствия</strong>
                  </Typography>
                  <Typography className={styles.trum}>
                    {mentor.trum
                      .split(/[ ,]+/)
                      .map((trum) => getMentorTrum(trum))}
                  </Typography>
                </div>
                <Typography variant='body2' color='textSecondary' component='p'>
                  {mentor.graduation ? `Випуск ${mentor.graduation}` : ' '}
                </Typography>
              </CardActions>
            </Card>
          ))}
      </Container>
      <Footer />
    </Container>
  );
};

export default Mentors;
