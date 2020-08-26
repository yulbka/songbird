import React from 'react';

import winnerImg from '../../assets/images/cool-bird.jpg';

import styles from './win.module.scss';

export function Win() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Абсолютная победа!</h2>
      <img className={styles.img} src={winnerImg} width={375} height={500} alt="eagle"/>
    </div>
  )
}