import React from 'react';
import PropTypes from 'prop-types';

import styles from './Level.module.scss';

export function Level({ name, isActiveButton }) {
  return (
    <li className={isActiveButton ? `${styles.level} ${styles.active}`: styles.level}>
      <button>{name}</button></li>
  )
}

Level.propTypes = {
  name: PropTypes.string,
  isActiveButton: PropTypes.bool
}