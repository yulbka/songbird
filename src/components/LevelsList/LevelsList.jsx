import React from 'react';

import { Level } from '../Level/Level';
import { levels } from './levelsData';
import { LevelContext } from '../../containers/App';

import styles from './LevelsList.module.scss';

export function LevelsList() {
  return (
    <ul className={styles.list}>
      { levels.map((level, index ) => {
          <LevelContext.Consumer>
            {activeLevel => <Level key={level.key} name={level.name} isActiveButton={activeLevel === index}/>}
          </LevelContext.Consumer>
      }) }
    </ul>
  )
}