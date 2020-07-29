import React from 'react';

import { levelsContext } from '../LevelsList/levels-context';

import styles from './Score.module.scss';

export function Score() {
  return (
    <levelsContext.Consumer>
      { ({ score }) => <div className={styles.score}>{`Score: ${score}`}</div>}
    </levelsContext.Consumer>
  )
}