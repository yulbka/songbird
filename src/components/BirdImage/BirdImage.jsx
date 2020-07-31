import React from 'react';
import PropTypes from 'prop-types';

import styles from './BirdImage.module.scss';

export function BirdImage({ imageSrc }) {
  return (
    <img className={styles.img} src={imageSrc} alt="bird" width={200} height={165} />
  )
}

BirdImage.propTypes = {
  imageSrc: PropTypes.string,
}