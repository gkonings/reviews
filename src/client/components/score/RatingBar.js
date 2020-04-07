import React from 'react';
import pt from 'prop-types';

import styles from './RatingBar.module.scss';

const RatingBar = ({ rating }) => (
  <div
    className={styles.rating}
    style={{ '--rating': rating }}
    aria-label={`A rating of ${rating}`}
  />
);

RatingBar.propTypes = {
  rating: pt.oneOfType([pt.number, pt.string]).isRequired,
};

export default RatingBar;
