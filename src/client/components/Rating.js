import React from 'react';
import pt from 'prop-types';

import styles from './Rating.module.scss';

const Rating = ({ rating }) => {
  return (
    <div
      className={styles.rating}
      style={{ '--rating': rating }}
      aria-label={`A rating of ${rating}`}
    />
  );
};

Rating.propTypes = {
  rating: pt.string.isRequired,
};

export default Rating;
