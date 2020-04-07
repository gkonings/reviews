import React from 'react';
import pt from 'prop-types';

import Rating from './Rating';
import PercentageBar from './PercentageBar';
import styles from './RatingOverview.module.scss';

const RatingOverview = ({ ratings, type }) => {
  return (
    <ul className={styles.ratingList}>
      {Object.keys(ratings).map((keyName) => {
        const value = ratings[keyName];
        if (value === 0) {
          return null;
        }

        return (
          <li className={styles.rating} key={keyName}>
            <span className={styles.label}>
              {keyName} ({value} / 10)
            </span>
            {type === 'stars' && <Rating rating={value} key={keyName} />}

            {type === 'percentage' && (
              <PercentageBar percentage={value * 10} key={keyName} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

RatingOverview.propTypes = {
  ratings: pt.shape({}).isRequired,
  type: pt.oneOf(['stars', 'percentage']),
};

RatingOverview.defaultProps = {
  type: 'stars',
};

export default RatingOverview;
