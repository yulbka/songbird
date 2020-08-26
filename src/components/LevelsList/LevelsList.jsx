import React from 'react';
import PropTypes from 'prop-types';

import { Level } from '../Level/Level';
import { levels } from './levelsData';

import styles from './LevelsList.module.scss';

export function LevelsList({ activeLevel }) {
  return (
      <ul className={styles.list}>
      { levels.map((level, index ) => {
        return <Level key={level.key} name={level.name} isActiveButton={activeLevel === index}/>
      }) }  
    </ul>
  )
}

LevelsList.propTypes = {
  activeLevel: PropTypes.number
}