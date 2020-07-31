import React from 'react';

import { Header } from '../components/Header/Header';
import { Question } from './Question/Question';
import { AnswersList } from '../components/AnswersList/AnswersList';
import birdsData from '../assets/data/data';

import styles from './App.module.scss';

export const LevelContext = React.createContext();
export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      activeLevel: 0,
      birds: birdsData[0],
      currentBird: birdsData[0][0],
      answers: []
    }

  }

  checkAnswer(answer, id) {
    const currentBird = this.state.currentBird.name;
    const checkedAnswer = answer === currentBird ? { id, answer: 'correct'}:
     { id, answer: 'wrong'};
    this.setState({
      answers: [...this.state.answers, checkedAnswer]
    });
  }

  render() {
    const { activeLevel, score, answers } = this.state;
    return (
      <LevelContext.Provider value={{score, activeLevel, answers}}>
        <div className={styles.wrapper}>
          <Header />
          <Question title={'******'} />
            <div className={styles['answer-container']}>
              <AnswersList birds={this.state.birds} checkAnswer={this.checkAnswer.bind(this)}/>
            </div>
          </div>
      </LevelContext.Provider>      
    )
  }
}