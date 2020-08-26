import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import momentDurationFormatSetup from 'moment-duration-format';

import styles from './Bar.module.scss';

export function Bar({ currentTime, duration, updateTime }) {
  const refProgress = useRef(null);

  const curPercentage = currentTime / duration * 100;

  const formatDuration = (duration) => {
    return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
  }

  function calcTime(e) {
    const barWidth = refProgress.current.offsetWidth;
    const barStartCoord = refProgress.current.getBoundingClientRect().left;
    const mousePositionInBar = e.clientX - barStartCoord;
    const curPercentage = mousePositionInBar / barWidth;
    return curPercentage * duration;
  }

  function changeAudioTime(e) {    
    const time = calcTime(e);
    updateTime(time);
    const updateTimeOnMouseMove = (e) => {
      const time = calcTime(e);
      updateTime(time);
    }

    document.addEventListener('mousemove', updateTimeOnMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMouseMove)
    });
  }

  return (
    <div className={styles.bar}>
      <div
        className={styles.progress}
        style={{
          background: `linear-gradient(to right, #00bc8c ${curPercentage}%, #737373 0)`
        }}
        ref={refProgress}
        onMouseDown={(event) => changeAudioTime(event)}
      >
        <span className={styles.circle} style={{ left: `${curPercentage - 2}%` }}
        />
      </div>
      <div className={styles.info}>
        <span className={styles.time}>{formatDuration(currentTime)}</span>
        <span className={styles.time}>{formatDuration(duration)}</span>
      </div>
    </div>
  )
}

Bar.propTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  updateTime: PropTypes.func
}