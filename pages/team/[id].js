import {
  Avatar,
  Backdrop,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Container,
  Grow,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDocument } from '@nandorojo/swr-firestore';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import firebase from 'firebase/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from 'styles/Team.module.scss';
import { getBeautifulColor } from 'utils/functions';

const Team = (props) => {
  const { data, update, mutate } = useDocument(`teams/${props.team.id}`, {
    listen: true,
    revalidateOnMount: true,
    initialData: props.team,
  });

  const [nameError, setNameError] = useState(false);
  const [projectTech, setProjectTech] = useState([]);
  const [projectUsers, setProjectUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  useEffect(() => {
    currentUsers();
    currentTech();
  }, [data.projectUsers]);

  const currentUsers = () => {
    if (data.projectUsers) {
      Promise.all(
        data.projectUsers.map(async (user) => {
          if (typeof user.get === 'function') {
            let doc = await user.get();
            return {
              ...doc.data(),
              id: doc.id,
            };
          }
        }),
      ).then((users) => setProjectUsers(users));
    }
  };

  const currentTech = () => {
    if (data.projectTech) {
      Promise.all(
        data.projectTech.map(async (tech) => {
          if (typeof tech.get === 'function') {
            let doc = await tech.get();
            return doc.data();
          }
        }),
      ).then((tech) => setProjectTech(tech));
    }
  };

  return (
    <Container maxWidth={false}>
      <Head>
        <title>Отбор &#8226; HackTUES</title>
        <meta name='description' content='Отбор в HackTUES'></meta>
      </Head>
      <Navbar />
      <Container className={styles.content} maxWidth='md' disableGutters>
        {data ? (
          <Grow in>
            <Card className={styles.card}>
              <CardHeader
                avatar={
                  <Avatar>{data.name ? data.name.charAt(0) : '' || ''}</Avatar>
                }
                className={styles['card-header']}
                title={data.name}
                subheader='Отбор'
              />
              <CardContent
                id='edit-team'
                className={styles['card-content']}
                component='form'
              >
                <div className={styles['input-container']}>
                  <TextField
                    label='Име на отбора'
                    value={data.name || ''}
                    error={nameError.length > 0}
                    helperText={nameError}
                    InputProps={{
                      readOnly: true,
                    }}
                    required
                    onChange={(e) =>
                      mutate(
                        {
                          ...data,
                          name: e.target.value,
                        },
                        false,
                      )
                    }
                  />
                  <TextField
                    label='Име на проекта'
                    value={data.projectName || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) =>
                      mutate(
                        {
                          ...data,
                          projectName: e.target.value,
                        },
                        false,
                      )
                    }
                  />
                </div>
                <div className={styles['input-container']}>
                  <TextField
                    label='Описание на проекта'
                    value={data.projectDescription || ''}
                    multiline
                    rowsMax={5}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) =>
                      mutate(
                        {
                          ...data,
                          projectDescription: e.target.value,
                        },
                        false,
                      )
                    }
                  />
                </div>
                <div className={styles['input-container']}>
                  <Typography>
                    Линк/ове към GitHub хранилище/а:{' '}
                    {data.projectLinks &&
                      data.projectLinks.split(/[ ,]+/).map((link, i) => (
                        <Link
                          className={styles['repo-link']}
                          key={i}
                          href={link}
                          rel='noopener noreferrer'
                          target='_blank'
                        >
                          {link}
                        </Link>
                      ))}
                  </Typography>
                </div>
                <div className={styles['input-container']}>
                  <Typography style={{ marginTop: '0' }}>
                    Потвърден:{' '}
                    {data.verified ? (
                      <strong
                        style={{
                          color: '#00e676',
                        }}
                      >
                        Да
                      </strong>
                    ) : (
                      <strong
                        style={{
                          color: '#f50057',
                        }}
                      >
                        Не
                      </strong>
                    )}
                  </Typography>
                </div>
                <div
                  className={`${styles['input-container']} ${styles['tech-container']}`}
                >
                  {projectTech &&
                    projectTech.map(
                      (item, index) =>
                        item && (
                          <Chip
                            className={styles.tech}
                            key={index}
                            clickable
                            style={getBeautifulColor(item.color)}
                            label={item.name}
                          />
                        ),
                    )}
                </div>
              </CardContent>
            </Card>
          </Grow>
        ) : (
          'loading'
        )}
        <Container
          className={styles['user-container']}
          disableGutters
          maxWidth={false}
        >
          {projectUsers &&
            projectUsers.map(
              (user, index) =>
                user && (
                  <Grow in key={index}>
                    <Card
                      className={`${styles['user-card']} ${styles['card']}`}
                    >
                      <CardHeader
                        avatar={<Avatar>{user.name.charAt(0)}</Avatar>}
                        title={`${user.name} ${user.surname}`}
                        subheader='Участник'
                      />
                    </Card>
                  </Grow>
                ),
            )}
        </Container>
        <Snackbar
          open={error.length > 0}
          autoHideDuration={6000}
          onClose={() => setError(false)}
        >
          <Alert
            elevation={6}
            variant='filled'
            onClose={() => setError(false)}
            severity='error'
          >
            {error}
          </Alert>
        </Snackbar>
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
        <Backdrop open={backdrop} style={{ zIndex: '9999' }}>
          <CircularProgress color='primary' />
        </Backdrop>
      </Container>
      <Footer />
    </Container>
  );
};

export const getServerSideProps = async (ctx) => {
  if (ctx.query && ctx.query.id) {
    let tech = await firebase.firestore().collection('tech').get();
    let team = await firebase.firestore().doc(`teams/${ctx.query.id}`).get();
    return {
      props: {
        tech: tech.docs.map((tag) => tag.data()),
        team: {
          id: team.id,
          name: team.data().name,
          projectName: team.data().projectName,
          projectDescription: team.data().projectDescription,
          projectLinks: team.data().projectLinks,
        },
      },
    };
  }
  return { props: {} };
};

export default Team;
