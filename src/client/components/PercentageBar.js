import React from 'react';
import pt from 'prop-types';

import styles from './PercentageBar.module.scss';

const PercentageBar = ({ percentage }) => {
  return (
    <div
      className={styles.percentageBar}
      style={{ '--percent': `${percentage}%` }}
      aria-label={`A percentage of ${percentage}`}
    />
  );
};

PercentageBar.propTypes = {
  percentage: pt.number,
};

PercentageBar.defaultProps = {
  percentage: 0,
};

export default PercentageBar;
