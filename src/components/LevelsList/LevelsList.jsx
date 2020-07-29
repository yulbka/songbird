import React from 'react';

import { Level } from '../Level/Level';
import { levelsContext } from './levels-context';

import styles from './LevelsList.module.scss';

export function LevelsList() {
  return (
    <ul className={styles.list}>
      <levelsContext.Consumer>
        { ({buttons}) => buttons.map((level) => {
          return <Level key={level.key} name={level.name} id={level.key}/>
        }) }
      </levelsContext.Consumer>
    </ul>
  )
}