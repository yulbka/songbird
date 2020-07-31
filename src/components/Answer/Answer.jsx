import React from 'react';
import PropTypes from 'prop-types';

import styles from './Answer.module.scss';

export function Answer({ name, id, checkAnswer, answers }) {

  let answer = answers.filter( (answer) => answer.id === id);
  answer = answer.length ? answer[0].answer: null;

  return (
  <li className={styles.bird} onClick={() => checkAnswer(name, id)}>
    <span className={answer ? `${styles.circle} ${styles[answer]}`: styles.circle}></span>
    <span className={styles.name}>{name}</span>
  </li>
  )
}

Answer.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  checkAnswer: PropTypes.func,
  answers: PropTypes.array
}