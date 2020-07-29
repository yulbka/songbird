import React from 'react';

export const levels = {
  buttons: [
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
  ],
  setActiveButton: () => {},
};

export const levelsContext = React.createContext(levels);