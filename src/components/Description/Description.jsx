import React from 'react';
import PropTypes from 'prop-types';

import { BirdImage } from '../BirdImage/BirdImage';
import { Player } from '../../containers/Player/Player';

import styles from './Description.module.scss';

export function Description({ chosenBird, imageSrc, title, audioSrc, species, description }) {
  return (
    <div className={styles.wrapper}>
      {chosenBird ? (
        <>
          <div className={styles.topContainer}>
            <BirdImage imageSrc={imageSrc} />
            <ul className={styles.list}>
             <li><h3 className={styles.title}>{title}</h3></li>
             <li><p>{species}</p></li>
             <li><Player audioSrc={audioSrc}/></li>
            </ul>
          </div>
      <p className={styles.description}>{description}</p>
        </>
    ) : (
      <>
        <p className={styles.text}>Послушайте плеер.</p>
        <p className={styles.text}>Выберите птицу из списка.</p>
      </>
    )}
    </div>
  )
}

Description.propTypes = {
  chosenBird: PropTypes.object,
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  audioSrc: PropTypes.string,
  species: PropTypes.string,
  description: PropTypes.string,
}