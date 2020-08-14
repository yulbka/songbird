import React from 'react';
import PropTypes from 'prop-types';

import { Header } from '../components/Header/Header';
import { Question } from './Question/Question';
import { AnswersList } from '../components/AnswersList/AnswersList';
import { Description } from '../components/Description/Description';
import { Button } from '../components/Button/Button';
import { Result } from '../components/Result/Result';
import { Win } from '../components/Win/Win';
import { levels } from '../components/LevelsList/levelsData';
import { connect } from 'react-redux';
import { initAsync, getBirdsDataAsync } from '../store/actions';

import styles from './App.module.scss';

class App extends React.Component {
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
    const { birds } = this.state;
    console.log(birds);
    this.setState({ chosenBird: birds[id - 1] });
  }

  goToNextLevel() {
    const { isAnswered, isGameEnded, levelsNumber } = this.state;
    const { location } = this.props;
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
    const { score, answers, isAnswered, chosenBird, isGameEnded, levelsNumber } = this.state;
    const { birds, currentBird } = this.props;
    console.log(birds);
    const { location } = this.props;
    const path = location.pathname.slice(1);
    console.log(path);
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
            birds={birds}
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

App.propTypes = {
  location: PropTypes.shape(Object),
  history: PropTypes.shape(Object),
  initialize: PropTypes.func,
  getBirdsData: PropTypes.func,
  birds: PropTypes.array,
  currentBird: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    isBlock: state.game.isBlock,
    birds: state.game.birds,
    currentBird: state.game.currentBird,
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