import React, { useState, useEffect } from 'react';

import { fetchReviews } from '../services/reviewService';
import Options from './Options';
import Review from '../components/Review';
import Pagination from '../components/pagination/Pagination';

const defaultOptions = {
  filterBy: 'ALL',
  sortBy: 'entryDate',
};

const Reviews = () => {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const [filterBy, setFilterBy] = useState(defaultOptions.filterBy);
  const [sortBy, setSortBy] = useState(defaultOptions.sortBy);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchReviews(page, {
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
  }, [page, filterBy, sortBy]);

  const updateFilterBy = (value) => {
    setPage(1);
    setFilterBy(value);
  };

  const updateSortBy = (value) => {
    setPage(1);
    setSortBy(value);
  };

  if (error) {
    return <section>{error}</section>;
  }

  return (
    <>
      <Options {...{ filterBy, sortBy, updateFilterBy, updateSortBy }} />
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
