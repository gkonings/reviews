import React from 'react';
import pt from 'prop-types';

import Score from './Score';
import styles from './ScoreOverview.module.scss';

const ScoreOverview = ({ ratings, type }) => {
  return (
    <ul className={styles.ratingList}>
      {Object.keys(ratings)
        .filter((keyName) => ratings[keyName])
        .map((keyName) => (
          <li className={styles.rating} key={keyName}>
            <Score title={keyName} value={ratings[keyName]} type={type} />
          </li>
        ))}
    </ul>
  );
};

ScoreOverview.propTypes = {
  ratings: pt.shape({}).isRequired,
  type: pt.oneOf(['stars', 'percentage']),
};

ScoreOverview.defaultProps = {
  type: 'stars',
};

export default ScoreOverview;
