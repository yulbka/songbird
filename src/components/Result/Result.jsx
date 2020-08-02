import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';

import styles from './Result.module.scss';

export function Result({ score, maxScore, isAnswered, handleClick, isGameEnded }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Поздравляем!</h2>
      <p className={styles.text}>{`Вы прошли викторину и набрали ${score} из ${maxScore} возможных баллов`}</p>
      <Button
        isAnswered={isAnswered}
        handleClick={handleClick}
        isGameEnded={isGameEnded}
      />
    </div>
  )
}

Result.propTypes = {
  score: PropTypes.number,
  maxScore: PropTypes.number,
  isAnswered: PropTypes.bool,
  handleClick: PropTypes.func,
  isGameEnded: PropTypes.bool
}
