import React from 'react';
import PropTypes from 'prop-types';

import { Answer } from '../Answer/Answer';
import birdsData from '../../assets/data/data';

import styles from './AnswersList.module.scss';

export function AnswersList({ activeLevel, checkAnswer, answers }) {
  return (
    <ul className={styles.list}>
      {birdsData[activeLevel].map((bird) => {
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
  activeLevel: PropTypes.number,
  checkAnswer: PropTypes.func,
  answers: PropTypes.array
}