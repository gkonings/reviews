import React, { useState, useEffect } from 'react';
import pt from 'prop-types';
import { fetchReviews } from '../services/reviewService';
import Review from './Review';
import Pagination from './Pagination';

import styles from './Reviews.module.scss';

const Reviews = () => {
  const [pagination, setPagination] = useState();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState();
  const [filterBy, setFilterBy] = useState();
  const [sortBy, setSortBy] = useState('entryDate');

  const fetchData = async (params) => {
    const allParams = {
      page: params.page || (pagination && pagination.page) || 1,
      filterBy: params.filterBy || filterBy,
      sortBy: params.sortBy || sortBy,
    };

    try {
      const result = await fetchReviews(allParams);
      setReviews(result.reviews);
      setPagination(result.pagination);
    } catch {
      setError(`The reviews could not be loaded`);
    }
  };

  useEffect(() => {
    fetchData({ page: 1 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return <section>{error}</section>;
  }

  return (
    <>
      <div className={styles.filter}>
        <section>
          Filter reviews by (with whom was the trip)
          <select>
            <option>All</option>
          </select>
        </section>
      </div>
      <section>
        {pagination && (
          <Pagination
            {...{ ...pagination }}
            onPageClick={(page) => fetchData({ page })}
          />
        )}
        {reviews.map((review) => (
          <Review {...review} key={review.id} />
        ))}
      </section>
    </>
  );
};

Reviews.propTypes = {
  reviews: pt.arrayOf(pt.shape({})).isRequired,
};

export default Reviews;
