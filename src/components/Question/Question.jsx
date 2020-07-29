import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import iconPlay from '../../assets/images/play.svg';
import iconPause from '../../assets/images/pause.svg';

import styles from './Question.module.scss';

export function Question({ title, isPlaying }) {
  const imgSrc = 'assets/images/bird-shadow.jpg';
  const audioSrc = 'https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3';
  return (
    <div className={styles.wrapper}>
      <img src={imgSrc} alt="bird" width={200} height={165} />
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.player}>
          <audio src={audioSrc}></audio>
          <div className={styles.play}>
            <SVG src={isPlaying ? iconPause: iconPlay} width={18} height={18}/>
          </div>                 
        </div>
      </div>
    </div>
  )
}

Question.propTypes = {
  title: PropTypes.string,
  isPlaying: PropTypes.bool
}
