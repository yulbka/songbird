import React from 'react';

import { levels, levelsContext } from '../components/LevelsList/levels-context';
import { Header } from '../components/Header/Header';
import { Question } from './Question/Question';

import styles from './App.module.scss';
export class App extends React.Component {
  constructor(props) {
    super(props);

    this.setActiveButton = (button) => {
      this.setState({activeButton: button});
    }

    this.state = {
      score: 0,
      buttons: levels,
      activeButton: levels[0].key,
    }

  }  

  render() {
    return (
      <div className={styles.wrapper}>
        <levelsContext.Provider value={this.state}>
          <Header />
        </levelsContext.Provider>
        <Question title={'******'} />    
      </div>
    )
  }
}