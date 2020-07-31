import React from 'react';
import PropTypes from 'prop-types';

import { Player } from '../Player/Player';
import { BirdImage } from '../../components/BirdImage/BirdImage';

import styles from './Question.module.scss';

export function Question({ title, audioSrc, imageSrc, isAnswered }) {
  const defaultImg = 'assets/images/bird-shadow.jpg';
  const defaultTitle = '******';

  return (
    <div className={styles.wrapper}>;
      <BirdImage imageSrc={isAnswered ? imageSrc: defaultImg} />
      <div className={styles.container}>
        <h3 className={styles.title}>{isAnswered ? title: defaultTitle}</h3>
        <Player audioSrc={audioSrc}/>
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
