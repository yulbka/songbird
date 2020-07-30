import React from 'react';
import PropTypes from 'prop-types';

import { Player } from '../Player/Player';

import styles from './Question.module.scss';

export function Question({ title }) {
  const imgSrc = 'assets/images/bird-shadow.jpg';
  const audioSrc = 'https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3';

  return (
    <div className={styles.wrapper}>
      <img className={styles.img} src={imgSrc} alt="bird" width={200} height={165} />
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <Player audioSrc={audioSrc}/>
      </div>
    </div>
  )   
}

Question.propTypes = {
  title: PropTypes.string
}
