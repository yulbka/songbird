import React from 'react';

import { Header } from '../components/Header/Header';
import { Question } from './Question/Question';
import { AnswersList } from '../components/AnswersList/AnswersList';
import { Description } from '../components/Description/Description';
import { Button } from '../components/Button/Button';
import { Result } from '../components/Result/Result';
import { Win } from '../components/Win/Win';
import { levels } from '../components/LevelsList/levelsData';
import history from 'history/hash';

import styles from './App.module.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      birds: [],
      currentBird: null,
      answers: [],
      chosenBird: null,
      isAnswered: false,
      numAttempts: 0,
      isGameEnded: false,
      levelsNumber: null,
    }

    this.baseScore = 5;
    this.audioWin = new Audio('assets/audio/win.mp3');
    this.audioError = new Audio('assets/audio/error.mp3');
  }

  componentDidMount() {
    const level = history.location.pathname.slice(1);
    fetch('http://localhost:3000/count')
      .then(res => res.text())
      .then(text => {
        console.log(text)
        this.setState({ levelsNumber: text })
      });   
    fetch(`http://localhost:3000/${level}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          birds: data,
          currentBird: data[Math.floor(Math.random() * Math.floor(6))],
        });
      });    
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
      this.audioWin.currentTime = 0;
      this.audioWin.play();
    } else {
      this.setState({
        answers: [...this.state.answers, { id, answer: 'wrong'}],
        numAttempts: this.state.numAttempts + 1,
      });
      this.audioError.currentTime = 0;
      this.audioError.play();
    }
  }

  countScore() {
    const addedScore = this.baseScore - this.state.numAttempts;
    return addedScore;
  }

  chooseBird(id) {
    const { birds } = this.state;
    console.log(birds);
    this.setState({ chosenBird: birds[id - 1] });
  }

  goToNextLevel() {
    const { isAnswered, isGameEnded, levelsNumber } = this.state;
    const path = history.location.pathname.slice(1);
    const activeLevel = levels.findIndex((level) => level.key === path);
    if (!isAnswered) return;
    if (isGameEnded) {
      return this.restartGame();
    }
    const level = (activeLevel === levelsNumber - 1) ? 0: activeLevel + 1;
    this.setState({
      answers: [],
      chosenBird: null,
      isAnswered: false,
      numAttempts: 0,
      isGameEnded: false
    });
    if (activeLevel === levelsNumber - 1) {
      this.setState({
        isGameEnded: true,
        isAnswered: true,
      });
    }
    if (!isGameEnded) history.push(`/${levels[level].key}`);
  }

  restartGame() {
    this.setState({
      score: 0,
      currentBird: null,
      answers: [],
      chosenBird: null,
      isAnswered: false,
      numAttempts: 0,
      isGameEnded: false
    });
    history.push('/train');
  }

  render() {
    const { score, answers, isAnswered, currentBird, chosenBird, isGameEnded, levelsNumber } = this.state;
    console.log(this.state);
    const path = history.location.pathname.slice(1);
    const level = levels.findIndex((level) => level.key === path);
    console.log(currentBird);
    const maxScore = this.baseScore * levelsNumber;
    return (
      <div className={styles.wrapper}>
        <Header activeLevel={level} score={score}/>        
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
            title={currentBird && currentBird.name}
            audioSrc={currentBird && currentBird.audio}
            imageSrc={currentBird && currentBird.image}
            isAnswered={isAnswered}
          />
          <div className={styles['answer-container']}>
          <AnswersList
            activeLevel={level}
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