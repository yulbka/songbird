import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Answer } from '../Answer/Answer';

import styles from './AnswersList.module.scss';

const AnswersList = ({ birds, checkAnswer, answers }) => {
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
  checkAnswer: PropTypes.func,
  answers: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    birds: state.game.birds,
  }
}

export default connect(mapStateToProps)(AnswersList);