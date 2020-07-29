import React from 'react';

import { levels, levelsContext } from '../components/LevelsList/levels-context';
import { Header } from './Header/Header';

import styles from './App.module.scss';
export class App extends React.Component {
  constructor(props) {
    super(props);

    this.setActiveButton = (button) => {
      this.setState({activeButton: button});
    }

    this.state = {
      buttons: levels.buttons,
      activeButton: levels.buttons[0].key,
      setActiveButton: this.setActiveButton
    }

  }  

  render() {
    return (
      <div className={styles.wrapper}>
        <levelsContext.Provider value={this.state}>
          <Header />
        </levelsContext.Provider>        
      </div>
    )
  }
}