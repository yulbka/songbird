import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

export function Button({ isAnswered, handleClick, isGameEnded }) {
  return (
    <button
      className={isAnswered ? `${styles.button} ${styles.active}`: styles.button}
      onClick={handleClick}
    >
      {isGameEnded ? 'Попробовать ещё раз': 'Следуюший уровень'}
    </button>
  )
}

Button.propTypes = {  
  isAnswered: PropTypes.bool,
  handleClick: PropTypes.func,
  isGameEnded: PropTypes.bool
}