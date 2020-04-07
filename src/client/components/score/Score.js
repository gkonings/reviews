import React from 'react';
import pt from 'prop-types';

import RatingBar from './RatingBar';
import PercentageBar from './PercentageBar';
import styles from './Score.module.scss';

const Score = ({ title, value, type }) => {
  if (value === 0) {
    return null;
  }
  return (
    <div className={styles.container}>
      <span className={styles.label}>
        {title} ({value} / 10)
      </span>
      {type === 'stars' && <RatingBar rating={value} />}

      {type === 'percentage' && <PercentageBar percentage={value * 10} />}
    </div>
  );
};

Score.propTypes = {
  title: pt.string,
  value: pt.oneOfType([pt.number, pt.string]),
  type: pt.oneOf(['stars', 'percentage']),
};

Score.defaultProps = {
  title: null,
  value: 0,
  type: 'stars',
};

export default Score;
