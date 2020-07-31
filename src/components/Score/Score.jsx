import React from 'react';

import { LevelContext } from '../../containers/App';

import styles from './Score.module.scss';

export function Score() {
  return (
    <LevelContext.Consumer>
      { ({ score }) => <div className={styles.score}>{`Score: ${score}`}</div>}
    </LevelContext.Consumer>
  )
}