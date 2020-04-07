import React, { useState, useEffect, useRef } from 'react';
import { fetchReviews } from '../services/reviewService';
import Review from './Review';
import Pagination from './Pagination';

import styles from './Reviews.module.scss';

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

const defaultOptions = {
  filterBy: 'ALL',
  sortBy: 'entryDate',
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Reviews = () => {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [filterBy, setFilterBy] = useState(defaultOptions.filterBy);
  const [sortBy, setSortBy] = useState(defaultOptions.sortBy);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState();
  const prevPage = usePrevious(page);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchReviews(page !== prevPage ? page : 1, {
          filterBy,
          sortBy,
        });
        setReviews(result.reviews);
        setPagination(result.pagination);
      } catch {
        setError(`The reviews could not be loaded`);
      }
    };

    fetchData();
  }, [page, prevPage, filterBy, sortBy]);

  if (error) {
    return <section>{error}</section>;
  }

  return (
    <>
      <div className={styles.filter}>
        <section>
          <label htmlFor="selectFilterBy">
            Filter reviews by (with whom was the trip)
            <select
              id="selectFilterBy"
              value={filterBy}
              onChange={(event) => setFilterBy(event.target.value)}
            >
              {filterByOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0) + option.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </label>

          <span>
            Sort By:
            {sortByOptions.map((input) => (
              <label htmlFor="selectSortBy" key={input.value}>
                <input
                  type="radio"
                  value={input.value}
                  checked={input.value === sortBy}
                  onChange={() => setSortBy(input.value)}
                />
                {input.name}
              </label>
            ))}
          </span>
        </section>
      </div>
      <section>
        {pagination && (
          <Pagination {...{ ...pagination, page }} onPageClick={setPage} />
        )}
        {reviews.map((review) => (
          <Review {...review} key={review.id} />
        ))}
      </section>
    </>
  );
};

export default Reviews;
