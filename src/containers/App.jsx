import React from 'react';
import PropTypes from 'prop-types';

import { Header } from '../components/Header/Header';
import { Result } from '../components/Result/Result';
import { Win } from '../components/Win/Win';
import { Game } from './Game/Game';
import { levels } from '../components/LevelsList/levelsData';
import { connect } from 'react-redux';
import { initAsync, getBirdsDataAsync } from '../store/actions';

import styles from './App.module.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      answers: [],
      chosenBird: null,
      isAnswered: false,
      numAttempts: 0,
      isGameEnded: false,
    }

    this.baseScore = 5;
    this.audioWin = new Audio('assets/audio/win.mp3');
    this.audioError = new Audio('assets/audio/error.mp3');
  }

  componentDidMount() {
    const { initialize } = this.props;
    const level = this.props.history.location.pathname.slice(1);
    initialize(level);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      const { getBirdsData } = this.props;
      const level = this.props.history.location.pathname.slice(1);
      getBirdsData(level);
    }
  }

  checkAnswer(answer, id) {
    this.chooseBird(id);
    if (this.state.isAnswered) return;
    const currentBird = this.props.currentBird.name;
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
    const { birds } = this.props;
    console.log(birds);
    this.setState({ chosenBird: birds[id - 1] });
  }

  goToNextLevel() {
    const { isAnswered, isGameEnded } = this.state;
    const { location, levelsNumber } = this.props;
    const path = location.pathname.slice(1);
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
    if (!isGameEnded) this.props.history.replace(`/${levels[level].key}`);
    console.log(this.props.history);
  }

  restartGame() {
    location.href = '/train';
  }

  render() {
    const { score, answers, isAnswered, chosenBird, isGameEnded } = this.state;
    const { currentBird, levelsNumber } = this.props;
    const { location } = this.props;
    const path = location.pathname.slice(1);
    const level = levels.findIndex((level) => level.key === path);
    console.log(currentBird);
    const maxScore = this.baseScore * levelsNumber;
    return (
      <div className={styles.wrapper}>
        <Header activeLevel={level} score={score}/>        
        {isGameEnded ? (
          (score === maxScore) ? (
            <Win
              handleClick={this.restartGame}
            />
          ): (
            <Result
              score={score}
              maxScore={maxScore}
              isAnswered={isAnswered}
              handleClick={this.goToNextLevel.bind(this)}
          />
          )) : (
          <Game
            answers={answers}
            chosenBird={chosenBird}
            isAnswered={isAnswered}
            handleClick={this.goToNextLevel.bind(this)}            
            checkAnswer={this.checkAnswer.bind(this)}
          />
        )}  
      </div>     
    )
  }
}

App.propTypes = {
  location: PropTypes.shape(Object),
  history: PropTypes.shape(Object),
  initialize: PropTypes.func,
  getBirdsData: PropTypes.func,
  birds: PropTypes.array,
  currentBird: PropTypes.object,
  levelsNumber: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    isBlock: state.game.isBlock,
    birds: state.game.birds,
    currentBird: state.game.currentBird,
    levelsNumber: state.game.levelsNum,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: (level) => {
      dispatch(initAsync(level))
    },
    getBirdsData: (level) => {
      dispatch(getBirdsDataAsync(level))
    }
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(App);