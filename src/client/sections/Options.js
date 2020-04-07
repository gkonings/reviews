import React from 'react';
import pt from 'prop-types';

import styles from './Options.module.scss';

const filterByOptions = [
  'ALL',
  'FAMILY',
  'FRIENDS',
  'COUPLE',
  'SINGLE',
  'OTHER',
];
const sortByOptions = [
  { name: 'Review date', value: 'entryDate' },
  { name: 'Trip date', value: 'travelDate' },
];

const Options = ({ filterBy, sortBy, updateFilterBy, updateSortBy }) => {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <label htmlFor="selectFilterBy" className={styles.filter}>
          Filter reviews by (with whom was the trip)
          <select
            id="selectFilterBy"
            value={filterBy}
            onChange={(event) => updateFilterBy(event.target.value)}
          >
            {filterByOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0) + option.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </label>

        <span className={styles.sort}>
          Sort By:
          {sortByOptions.map((input) => (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label key={input.value}>
              <input
                type="radio"
                value={input.value}
                checked={input.value === sortBy}
                onChange={() => updateSortBy(input.value)}
              />
              {input.name}
            </label>
          ))}
        </span>
      </section>
    </div>
  );
};

Options.propTypes = {
  filterBy: pt.string.isRequired,
  sortBy: pt.string.isRequired,
  updateFilterBy: pt.func.isRequired,
  updateSortBy: pt.func.isRequired,
};

export default Options;
