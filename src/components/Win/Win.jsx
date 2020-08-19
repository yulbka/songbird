import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';

import winnerImg from '../../assets/images/cool-bird.jpg';

import styles from './win.module.scss';

export const Win = ({ handleClick }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Абсолютная победа!</h2>
      <img className={styles.img} src={winnerImg} width={375} height={500} alt="eagle"/>
      <Button
        text={'Сыграть ещё раз'}
        isAnswered={true}
        handleClick={handleClick}
      />
    </div>
  )
}

Win.propTypes = {
  handleClick: PropTypes.func,
}