import React from 'react';
import PropTypes from 'prop-types';

import styles from './Score.module.scss';

export function Score({ score }) {
  return (    
     <div className={styles.score}>{`Счёт: ${score}`}</div>
  )
}

Score.propTypes = {
  score: PropTypes.number,
}