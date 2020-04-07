import React, { useState, useEffect } from 'react';
import pt from 'prop-types';
import { fetchReviews } from '../services/reviewService';
import Review from './Review';
import Pagination from './Pagination';

const Reviews = () => {
  const [pagination, setPagination] = useState();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState();
  const filterOptions = [
    'all',
    'family',
    'couple',
    'single',
    'friends',
    'other',
  ];

  const fetchData = async ({ page }) => {
    try {
      const result = await fetchReviews({ page });
      console.log({ result });

      setReviews(result.reviews);
      setPagination(result.pagination);
    } catch {
      setError(`The reviews could not be loaded`);
    }
  };

  useEffect(() => {
    fetchData({ page: 1 });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePageClick = (page) => {
    fetchData({ page });
  };

  if (error) {
    return <section>{error}</section>;
  }

  return (
    <section>
      {pagination && (
        <Pagination {...{ ...pagination }} onPageClick={handlePageClick} />
      )}
      {reviews.map((review) => (
        <Review {...review} key={review.id} />
      ))}
    </section>
  );
};

Reviews.propTypes = {
  reviews: pt.arrayOf(pt.shape({})).isRequired,
};

export default Reviews;
