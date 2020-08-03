import React from 'react';

import { Header } from '../components/Header/Header';
import { Question } from './Question/Question';
import { AnswersList } from '../components/AnswersList/AnswersList';
import { Description } from '../components/Description/Description';
import { Button } from '../components/Button/Button';
import { Result } from '../components/Result/Result';
import { Win } from '../components/Win/Win';
import birdsData from '../assets/data/data';

import styles from './App.module.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      activeLevel: 0,
      currentBird: birdsData[0][Math.floor(Math.random() * Math.floor(birdsData.length))],
      answers: [],
      chosenBird: null,
      isAnswered: false,
      numAttempts: 0,
      isGameEnded: false,
    }

    this.baseScore = 5;

  }

  checkAnswer(answer, id) {
    this.chooseBird(id);
    if (this.state.isAnswered) return;
    const currentBird = this.state.currentBird.name;
    const score = this.countScore();
    if (answer === currentBird) {
      this.setState({
        score: this.state.score + score,
        isAnswered: true,
        answers: [...this.state.answers, { id, answer: 'correct'}],
      });
    } else {
      this.setState({
        answers: [...this.state.answers, { id, answer: 'wrong'}],
        numAttempts: this.state.numAttempts + 1,
      });
    }
  }

  countScore() {
    const addedScore = this.baseScore - this.state.numAttempts;
    return addedScore;
  }

  chooseBird(id) {
    const level = this.state.activeLevel;
    this.setState({ chosenBird: birdsData[level][id - 1] });
  }

  goToNextLevel() {
    const { activeLevel, isAnswered, isGameEnded } = this.state;
    if (!isAnswered) return;
    if (isGameEnded) {
      return this.restartGame();
    }
    const level = (activeLevel === birdsData.length - 1) ? 0: activeLevel + 1;
    this.setState({
      activeLevel: level,
      currentBird: birdsData[level][Math.floor(Math.random() * Math.floor(birdsData.length))],
      answers: [],
      chosenBird: null,
      isAnswered: false,
      numAttempts: 0,
      isGameEnded: false
    });
    if (this.state.activeLevel === birdsData.length - 1) {
      this.setState({
        isGameEnded: true,
        isAnswered: true,
      });
    }
  }

  restartGame() {
    this.setState({
      score: 0,
      activeLevel: 0,
      currentBird: birdsData[0][Math.floor(Math.random() * Math.floor(birdsData.length))],
      answers: [],
      chosenBird: null,
      isAnswered: false,
      numAttempts: 0,
      isGameEnded: false
    });
  }

  render() {
    const { activeLevel, score, currentBird, answers, isAnswered, chosenBird, isGameEnded } = this.state;
    console.log(currentBird);
    const maxScore = this.baseScore * birdsData.length;
    return (
      <div className={styles.wrapper}>
        <Header activeLevel={activeLevel} score={score}/>        
        {isGameEnded ? (
          (score === maxScore) ? (
            <Win />
          ): (
            <Result
            score={score}
            maxScore={maxScore}
            isAnswered={isAnswered}
            handleClick={this.goToNextLevel.bind(this)}
            isGameEnded={isGameEnded}
          />
          )) : (
          <React.Fragment>
          <Question
            title={currentBird.name}
            audioSrc={currentBird.audio}
            imageSrc={currentBird.image}
            isAnswered={isAnswered}
          />
          <div className={styles['answer-container']}>
          <AnswersList
            activeLevel={activeLevel}
            answers={answers}
            checkAnswer={this.checkAnswer.bind(this)}
          />
          <Description
            chosenBird={chosenBird}
            imageSrc={chosenBird ? chosenBird.image: null}
            title={chosenBird ? chosenBird.name: null}
            audioSrc={chosenBird ? chosenBird.audio: null}
            species={chosenBird ? chosenBird.species: null}
            description={chosenBird ? chosenBird.description: null}
          />
          <Button
            isAnswered={isAnswered}
            handleClick={this.goToNextLevel.bind(this)}
            isGameEnded={isGameEnded}
          />
        </div>
        </React.Fragment>
        )}  
      </div>     
    )
  }
}