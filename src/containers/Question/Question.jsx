import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Player } from '../Player/Player';
import { BirdImage } from '../../components/BirdImage/BirdImage';

import defaultBird from '../../assets/images/bird-shadow.jpg';

import styles from './Question.module.scss';

const Question = ({ currentBird, isAnswered }) => {
  const defaultTitle = '******';

  return currentBird && (
    <div className={styles.wrapper}>
      <BirdImage imageSrc={isAnswered ? currentBird.image: defaultBird} />
      <div className={styles.container}>
        <h3 className={styles.title}>{isAnswered ? currentBird.name: defaultTitle}</h3>
        <Player audioSrc={currentBird.audio} isAnswered={isAnswered} />
      </div>
    </div>
  )
}

Question.propTypes = {
  currentBird: PropTypes.object,
  isAnswered: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    currentBird: state.game.currentBird,
  }
}

export default connect(mapStateToProps)(Question);
