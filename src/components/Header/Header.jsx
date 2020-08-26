import React from 'react';
import PropTypes from 'prop-types';

import { Logo } from '../logo/Logo';
import { Score } from '../Score/Score';
import { LevelsList } from '../LevelsList/LevelsList';

import styles from './Header.module.scss'

export function Header({ activeLevel, score }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Logo />
        <Score score={score}/>
      </div>
      <LevelsList activeLevel={activeLevel}/>
    </div>
    )
}

Header.propTypes = {
  activeLevel: PropTypes.number,
  score: PropTypes.number,
}