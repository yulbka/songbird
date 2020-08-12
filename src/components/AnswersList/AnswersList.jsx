import React from 'react';
import PropTypes from 'prop-types';

import { Answer } from '../Answer/Answer';

import styles from './AnswersList.module.scss';

export function AnswersList({ birds, checkAnswer, answers }) {
  return (
    <ul className={styles.list}>
      {birds.map((bird) => {
        return <Answer
          key={bird.id}
          name={bird.name}
          checkAnswer={checkAnswer}
          id={bird.id}
          answers={answers}
        />
      })}
    </ul>
  )
}

AnswersList.propTypes = {
  birds: PropTypes.array,
  activeLevel: PropTypes.number,
  checkAnswer: PropTypes.func,
  answers: PropTypes.array
}