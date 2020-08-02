import React from 'react';

import { Header } from '../components/Header/Header';
import { Question } from './Question/Question';
import { AnswersList } from '../components/AnswersList/AnswersList';
import { Description } from '../components/Description/Description';
import { Button } from '../components/Button/Button';
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
    }

  }

  checkAnswer(answer, id) {
    this.chooseBird(id);
    if (this.state.isAnswered) return;
    const currentBird = this.state.currentBird.name;
    const checkedAnswer = answer === currentBird ? { id, answer: 'correct'}:
     { id, answer: 'wrong'};
    this.setState({
      answers: [...this.state.answers, checkedAnswer]
    });
    if (answer === currentBird) {
      this.setState({ isAnswered: true });
    }
  }

  chooseBird(id) {
    const level = this.state.activeLevel;
    this.setState({ chosenBird: birdsData[level][id - 1] });
  }

  goToNextLevel() {
    if (!this.state.isAnswered) return;
    this.setState({
      activeLevel: this.state.activeLevel + 1,
      currentBird: birdsData[this.state.activeLevel + 1][Math.floor(Math.random() * Math.floor(birdsData.length))],
      answers: [],
      chosenBird: null,
      isAnswered: false,
    })
  }

  render() {
    const { activeLevel, score, currentBird, answers, isAnswered, chosenBird } = this.state;
    return (
      <div className={styles.wrapper}>
        <Header activeLevel={activeLevel} score={score}/>
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
          <Button isAnswered={isAnswered} handleClick={this.goToNextLevel.bind(this)} />
        </div>
      </div>     
    )
  }
}