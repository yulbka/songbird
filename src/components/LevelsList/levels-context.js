import React from 'react';

export const levels = [
  {
    key: 'train',
    name: 'Разминка',
  },
  {
    key: 'sparrow',
    name: 'Воробьиные',
  },
  {
    key: 'forest',
    name: 'Лесные птицы',
  },
  {
    key: 'predator',
    name: 'Хищные птицы', 
  },
  {
    key: 'sea',
    name: 'Морские птицы',
  }
  ];

export const levelsContext = React.createContext(levels);