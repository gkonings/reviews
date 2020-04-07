import React from 'react';
import pt from 'prop-types';

import styles from './StarRating.module.scss';

const StarRating = ({ rating }) => {
  return (
    <div className={styles.rating}>
      <span className={styles.content}>{rating}</span>
    </div>
  );
};

StarRating.propTypes = {
  rating: pt.string.isRequired,
};

export default StarRating;
