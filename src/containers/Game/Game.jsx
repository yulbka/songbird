import React from 'react';
import PropTypes from 'prop-types';

import Question from '../Question/Question';
import AnswersList from '../../components/AnswersList/AnswersList';
import { Description } from '../../components/Description/Description';
import { Button } from '../../components/Button/Button';

import styles from './Game.module.scss';

export function Game({ answers, chosenBird, isAnswered, handleClick, checkAnswer }) {
  return (    
    <React.Fragment>
      <Question isAnswered={isAnswered} />
      <div className={styles['answer-container']}>
        <AnswersList
          answers={answers}
          checkAnswer={checkAnswer}
        />
        <Description
          chosenBird={chosenBird}
          imageSrc={chosenBird && chosenBird.image}
          title={chosenBird && chosenBird.name}
          audioSrc={chosenBird && chosenBird.audio}
          species={chosenBird && chosenBird.species}
          description={chosenBird && chosenBird.description}
        />
        <Button
          isAnswered={isAnswered}
          handleClick={handleClick}
          text={'Следующий уровень'}
        />
      </div>
    </React.Fragment>
  )
}

Game.propTypes = {
  answers: PropTypes.array,
  chosenBird: PropTypes.object,
  isAnswered: PropTypes.bool,
  handleClick: PropTypes.func,
  isGameEnded: PropTypes.bool,
  checkAnswer: PropTypes.func,
}