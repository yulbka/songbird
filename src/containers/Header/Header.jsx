import React from 'react';

import { Logo } from '../../components/logo/Logo';
import { Score } from '../../components/Score/Score';
import { LevelsList } from '../../components/LevelsList/LevelsList';

import styles from './Header.module.scss'

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0
    }
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Logo />
          <Score score={this.state.score}/>
        </div>
        <LevelsList />
      </div>
    )
  }
}