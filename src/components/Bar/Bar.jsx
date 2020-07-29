import React from 'react';
import PropTypes from 'prop-types';

import styles from './Bar.module.scss';

export function Bar({ duration }) {
  const curPercentage = 20;
  return (
    <div className={styles.bar}>
      <div
        className={styles.progress}
        style={{
          background: `linear-gradient(to right, #00bc8c ${curPercentage}%, #737373 0)`
        }}
      >
        <span className={styles.circle} style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.time}>00:00</span>
      <span className={styles.time}>{duration}</span>
      </div>
    </div>
  )
}

Bar.propTypes = {
  duration: PropTypes.number
}