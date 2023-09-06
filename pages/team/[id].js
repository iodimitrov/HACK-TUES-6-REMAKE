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
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import { useState } from 'react';
import styles from 'styles/Team.module.scss';
import { getBeautifulColor } from 'utils/functions';
import { teams } from '../../data/teams';

const Team = (props) => {
  const [nameError, setNameError] = useState(false);
  const [newUsers, setNewUsers] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  return (
    <Container maxWidth={false}>
      <Head>
        <title>Отбор &#8226; HackTUES</title>
        <meta name='description' content='Отбор в HackTUES'></meta>
      </Head>
      <Navbar />
      <Container className={styles.content} maxWidth='md' disableGutters>
        {props.team ? (
          <Grow in>
            <Card className={styles.card}>
              <CardHeader
                avatar={
                  <Avatar>
                    {props.team.name ? props.team.name.charAt(0) : '' || ''}
                  </Avatar>
                }
                className={styles['card-header']}
                title={props.team.name}
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
                    value={props.team.name || ''}
                    error={nameError.length > 0}
                    helperText={nameError}
                    InputProps={{
                      readOnly: true,
                    }}
                    required
                    onChange={(e) =>
                      mutate(
                        {
                          ...props.team,
                          name: e.target.value,
                        },
                        false,
                      )
                    }
                  />
                  <TextField
                    label='Име на проекта'
                    value={props.team.projectName || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) =>
                      mutate(
                        {
                          ...props.team,
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
                    value={props.team.projectDescription || ''}
                    multiline
                    rowsMax={5}
                    InputProps={{
                      readOnly: true,
                    }}
                    onChange={(e) =>
                      mutate(
                        {
                          ...props.team,
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
                    {props.team.projectLinks &&
                      props.team.projectLinks.split(/[ ,]+/).map((link, i) => (
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
                    {props.team.verified ? (
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
                  {props.team.projectTech &&
                    props.team.projectTech.map(
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
          {props.team.projectUsers &&
            props.team.projectUsers.map(
              (user, index) =>
                user && (
                  <Grow in key={index}>
                    <Card
                      className={`${styles['user-card']} ${styles['card']}`}
                    >
                      <CardHeader
                        avatar={<Avatar>{user.name.charAt(0)}</Avatar>}
                        className={
                          user.isLeader ? styles['card-header'] : undefined
                        }
                        title={`${user.name} ${user.surname}`}
                        subheader={user.isLeader ? 'Капитан' : 'Участник'}
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

export const getStaticPaths = () => {
  return {
    paths: teams.map(({ id }) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps = (ctx) => {
  if (ctx.params && ctx.params.id) {
    return {
      props: {
        team: teams.find((t) => t.id === ctx.params.id),
      },
    };
  }
  return { props: {} };
};

export default Team;
