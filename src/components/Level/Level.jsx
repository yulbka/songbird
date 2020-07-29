import React from 'react';
import PropTypes from 'prop-types';

import { levelsContext } from '../LevelsList/levels-context';

import styles from './Level.module.scss';

export function Level({ id, name }) {
  return (
    <levelsContext.Consumer> 
      {({activeButton, setActiveButton}) => <li 
                  className={id === activeButton ? `${styles.level} ${styles.active}`: styles.level}
                  onClick={() => setActiveButton(id)}
                >
        <button>{name}</button></li>}
    </levelsContext.Consumer>
  )
}

Level.propTypes = {
  id:  PropTypes.string,
  name: PropTypes.string
}