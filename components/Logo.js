import { Container } from '@material-ui/core';
import styles from 'styles/Logo.module.scss';

const Logo = () => {
  let colorize = (e) => {
    if (
      document.defaultView.getComputedStyle(e.target, null)[
        'backgroundColor'
      ] === 'rgb(0, 0, 0)'
    ) {
      e.target.style.backgroundColor = '#FDA520';
    } else if (
      document.defaultView.getComputedStyle(e.target, null)[
        'backgroundColor'
      ] === 'rgb(253, 165, 32)'
    ) {
      e.target.style.backgroundColor = 'black';
    }
  };

  let createHack = () => {
    let boxes = [];
    for (let i = 0; i < 175; i++) {
      boxes.push(
        <div onMouseOver={colorize} className='logo-box' key={i}></div>,
      );
    }
    return boxes;
  };

  let createTues = () => {
    let boxes = [];
    for (let i = 0; i < 175; i++) {
      boxes.push(
        <div onMouseOver={colorize} className='logo-box' key={i}></div>,
      );
    }
    return boxes;
  };

  let createSix = () => {
    let boxes = [];
    for (let i = 0; i < 42; i++) {
      boxes.push(
        <div onMouseOver={colorize} className='logo-box' key={i}></div>,
      );
    }
    return boxes;
  };
  return (
    <Container className={styles['teaser-logo']}>
      <div className={styles.hack}>{createHack()}</div>
      <div className={styles.tues}>{createTues()}</div>
      <div className={styles.six}>{createSix()}</div>
    </Container>
  );
};

export default Logo;
