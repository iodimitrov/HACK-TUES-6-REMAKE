import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Link as MuiLink,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Footer from 'components/Footer';
import Link from 'components/Link';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from 'styles/Teams.module.scss';
import { getBeautifulColor } from 'utils/functions';
import { teams } from '../data/teams';

const Teams = (props) => {
  const [showVerified, setShowVerified] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.onkeypress = (e) => {
      if (e.keyCode === 102 || e.keyCode === 1092) {
        window.open(
          'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO',
          '_blank',
        );
      }
    };
    return () => {
      document.onkeypress = (e) => {};
    };
  });

  return (
    <Container maxWidth={false}>
      <Head>
        <title>Отбори &#8226; HackTUES</title>
        <meta name='description' content='Отборите в HackTUES'></meta>
      </Head>
      <Navbar />
      <Container
        maxWidth={false}
        className={styles['sponsors-container']}
        disableGutters
      >
        <MuiLink
          href='https://www.sap.com/bulgaria/index.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className={styles.sap}
            src='https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/logos%2F1.sap.png?alt=media&token=ff3a7975-9b4e-4bc4-894a-1773910d8fb8'
            alt='sap'
          />
        </MuiLink>
        <MuiLink
          href='http://telebid-pro.com/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className={styles.telebid}
            src='https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/logos%2F2.telebid.svg?alt=media&token=d4dc0866-ab95-4154-ab92-b9ba4fd90e4f'
            alt='telebidpro'
          />
        </MuiLink>
        <MuiLink
          href='https://www.experian.bg/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className={styles.experian}
            src='https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/logos%2F3.experian.png?alt=media&token=233ad042-f4f6-4ae3-b81e-388591b7c889'
            alt='experian'
          />
        </MuiLink>
        <MuiLink
          href='https://www.facebook.com/vmwarebg/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            className={styles.vmware}
            src='https://firebasestorage.googleapis.com/v0/b/hack-tues.appspot.com/o/logos%2F4.vmware.png?alt=media&token=2c20475d-49a9-442c-9d0c-249059f61523'
            alt='vmware'
          />
        </MuiLink>
      </Container>
      <Container maxWidth={false} className={styles.content} disableGutters>
        {teams ? (
          teams.filter((team) =>
            showVerified ? team.verified : !team.verified,
          ).length > 0 ? (
            teams
              .filter((team) => (showVerified ? team.verified : !team.verified))
              .map((team, i) => (
                <Card key={i} className={styles.card}>
                  <CardHeader
                    underline='none'
                    component={Link}
                    href='/team/[id]'
                    as={`/team/${team.id}`}
                    avatar={<Avatar>{team.name.charAt(0)}</Avatar>}
                    className={styles['card-header']}
                    title={`${team.name}`}
                    subheader='Отбор'
                  />
                  <CardContent
                    underline='none'
                    component={Link}
                    href='/team/[id]'
                    as={`/team/${team.id}`}
                    className={styles['card-content']}
                  >
                    <div className={styles['data-container']}>
                      <Typography>
                        <strong>Технологии</strong>
                      </Typography>
                      {team.projectTech &&
                        team.projectTech.map(
                          (tech, i) =>
                            tech && (
                              <Chip
                                className={styles.tech}
                                key={i}
                                style={getBeautifulColor(tech.color)}
                                label={tech.name}
                              />
                            ),
                        )}
                    </div>
                    <div className={styles['data-container']}>
                      <Typography>
                        <strong>Участници</strong>
                      </Typography>
                      {team.projectUsers &&
                        team.projectUsers.map(
                          (user, i) =>
                            user && (
                              <Typography
                                key={i}
                              >{`${user.name} ${user.surname} - ${user.grade}`}</Typography>
                            ),
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <Card className={styles.card}>
              {showVerified ? (
                <CardHeader
                  className={styles['card-header']}
                  title='Няма потвърдени отбори :O'
                  subheader='press f to pay respects'
                />
              ) : (
                <CardHeader
                  className={styles['card-header']}
                  title='Няма непотвърдени отбори'
                  subheader='good to know :))'
                />
              )}
            </Card>
          )
        ) : (
          <Card className={styles.card}>
            <CardHeader
              className={styles['card-header']}
              title='Няма никакви отбори'
            />
          </Card>
        )}
        <Snackbar
          open={success.length > 0}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            elevation={6}
            variant='filled'
            onClose={() => setSuccess(false)}
            severity='success'
          >
            {success}
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </Container>
  );
};

export default Teams;
