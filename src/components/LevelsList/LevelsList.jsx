import React from 'react';

import { Level } from '../Level/Level';

import styles from './LevelsList.module.scss';

export function LevelsList() {
  const listItems = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'].map((level, index) => {
    return <Level key={index} name={level} />
  });
  return (
    <ul className={styles.list}>
      {listItems}
    </ul>
  )
}