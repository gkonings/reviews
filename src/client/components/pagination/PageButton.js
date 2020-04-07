import React from 'react';
import pt from 'prop-types';
import cx from 'clsx';

import styles from './PageButton.module.scss';

const PageButton = ({ children, firstButton, lastButton, active, ...rest }) => {
  return (
    <button
      type="button"
      className={cx(
        styles.button,
        firstButton && styles.firstButton,
        lastButton && styles.lastButton,
        active && styles.active
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

PageButton.propTypes = {
  children: pt.oneOfType([pt.number, pt.string]).isRequired,
  firstButton: pt.bool,
  lastButton: pt.bool,
  active: pt.bool,
};

PageButton.defaultProps = {
  firstButton: false,
  lastButton: false,
  active: false,
};

export default PageButton;
