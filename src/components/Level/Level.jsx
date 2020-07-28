import React from 'react';
import PropTypes from 'prop-types';

import styles from './Level.module.scss';

export function Level({ name }) {
  return (
    <li className={styles.button}>{name}</li>
  )
}

Level.propTypes = {
  name: PropTypes.string
}