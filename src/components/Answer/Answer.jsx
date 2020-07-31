import React from 'react';
import PropTypes from 'prop-types';

import { LevelContext } from '../../containers/App';

import styles from './Answer.module.scss';

export function Answer({ name, id, checkAnswer }) {
  return (
  <li className={styles.bird} onClick={() => checkAnswer(name, id)}>
    <LevelContext.Consumer>
      {({ answers }) => {
        let answer = answers.filter( (answer) => answer.id === id);
        answer = answer.length ? answer[0].answer: null;
        return <span className={answer ? `${styles.circle} ${styles[answer]}`: styles.circle}></span>
      }}
    </LevelContext.Consumer>
    <span className={styles.name}>{name}</span>
  </li>
  )
}

Answer.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  checkAnswer: PropTypes.func
}