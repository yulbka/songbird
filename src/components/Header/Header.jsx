import React from 'react';

import { Logo } from '../logo/Logo';
import { Score } from '../Score/Score';
import { LevelsList } from '../LevelsList/LevelsList';

import styles from './Header.module.scss'

export function Header() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Logo />
        <Score />
      </div>
      <LevelsList />
    </div>
    )
}