import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

export function Button({ isAnswered, handleClick, text }) {
  return (
    <button
      className={isAnswered ? `${styles.button} ${styles.active}`: styles.button}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

Button.propTypes = {  
  isAnswered: PropTypes.bool,
  handleClick: PropTypes.func,
  text: PropTypes.string
}