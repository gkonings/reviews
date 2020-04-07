import React from 'react';
import pt from 'prop-types';
import cx from 'clsx';

import styles from './Pagination.module.scss';

const getPages = (totalPages, page) => {
  const maxLength = 7;

  const range = (start, end) => {
    return Array.from(Array(end - start + 1), (_, i) => i + start);
  };

  const sideWidth = maxLength < 9 ? 1 : 2;

  const leftWidth = (maxLength - sideWidth * 2 - 3) >> 1; // eslint-disable-line no-bitwise
  const rightWidth = (maxLength - sideWidth * 2 - 2) >> 1; // eslint-disable-line no-bitwise
  if (totalPages <= maxLength) {
    // no breaks in list
    return range(1, totalPages);
  }
  if (page <= maxLength - sideWidth - 1 - rightWidth) {
    // no break on left of page
    return range(1, maxLength - sideWidth - 1).concat(
      0,
      range(totalPages - sideWidth + 1, totalPages)
    );
  }
  if (page >= totalPages - sideWidth - 1 - rightWidth) {
    // no break on right of page
    return range(1, sideWidth).concat(
      0,
      range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
    );
  }
  // Breaks on both sides
  return range(1, sideWidth).concat(
    0,
    range(page - leftWidth, page + rightWidth),
    0,
    range(totalPages - sideWidth + 1, totalPages)
  );
};

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
  children: pt.string.isRequired,
  firstButton: pt.bool,
  lastButton: pt.bool,
  active: pt.bool,
};

PageButton.defaultProps = {
  firstButton: false,
  lastButton: false,
  active: false,
};

const Pagination = ({
  curPage,
  numPages,
  start,
  limit,
  length,
  onPageClick,
}) => {
  const pages = getPages(numPages, curPage);
  const startIndex = (curPage - 1) * 5 + 1;

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <PageButton
            disabled={curPage === 1}
            onClick={() => onPageClick(curPage - 1)}
            firstButton
          >
            {'<<'}
          </PageButton>
        </li>

        {pages.map((page) => (
          <li>
            {page === 0 ? (
              <PageButton disabled>...</PageButton>
            ) : (
              <PageButton
                disabled={curPage === page}
                active={curPage === page}
                onClick={() => onPageClick(page)}
              >
                {page}
              </PageButton>
            )}
          </li>
        ))}

        <li>
          <PageButton
            disabled={curPage === numPages}
            onClick={() => onPageClick(curPage + 1)}
            lastButton
          >
            {'>>'}
          </PageButton>
        </li>
      </ul>
      <em className={styles.description}>
        Show {start + 1}-{start + limit} out of {length} reviews
      </em>
    </nav>
  );
};

Pagination.propTypes = {
  curPage: pt.number.isRequired,
  numPages: pt.number.isRequired,
  onPageClick: pt.func,
  start: pt.number.isRequired,
  limit: pt.number.isRequired,
  length: pt.number.isRequired,
};

Pagination.defaultProps = {
  onPageClick: () => null,
};

export default Pagination;
