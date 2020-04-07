import React from 'react';
import pt from 'prop-types';

import getPages from '../../utils/getPages';
import PageButton from './PageButton';
import styles from './Pagination.module.scss';

const Pagination = ({ page, numPages, start, limit, length, onPageClick }) => {
  const pages = getPages(numPages, page);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <PageButton
            disabled={page === 1}
            onClick={() => onPageClick(page - 1)}
            firstButton
          >
            {'<<'}
          </PageButton>
        </li>

        {pages.map((p) => (
          <li key={p}>
            {p === 0 ? (
              <PageButton disabled>...</PageButton>
            ) : (
              <PageButton
                disabled={page === p}
                active={page === p}
                onClick={() => onPageClick(p)}
              >
                {p}
              </PageButton>
            )}
          </li>
        ))}

        <li>
          <PageButton
            disabled={page === numPages}
            onClick={() => onPageClick(page + 1)}
            lastButton
          >
            {'>>'}
          </PageButton>
        </li>
      </ul>
      <em className={styles.description}>
        Show {start + 1}-{start + limit < length ? start + limit : length} out
        of {length} reviews
      </em>
    </nav>
  );
};

Pagination.propTypes = {
  page: pt.number.isRequired,
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
