import React from 'react';
import PropTypes from 'prop-types';

import { Player } from '../Player/Player';
import { BirdImage } from '../../components/BirdImage/BirdImage';

import defaultBird from '../../assets/images/bird-shadow.jpg';

import styles from './Question.module.scss';

export function Question({ title, audioSrc, imageSrc, isAnswered }) {
  const defaultTitle = '******';

  return (
    <div className={styles.wrapper}>
      <BirdImage imageSrc={isAnswered ? imageSrc: defaultBird} />
      <div className={styles.container}>
        <h3 className={styles.title}>{isAnswered ? title: defaultTitle}</h3>
        <Player audioSrc={audioSrc} isAnswered={isAnswered} />
      </div>
    </div>
  )
}

Question.propTypes = {
  title: PropTypes.string,
  audioSrc: PropTypes.string,
  imageSrc: PropTypes.string,
  isAnswered: PropTypes.bool,
}
