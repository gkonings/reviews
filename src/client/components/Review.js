import React from 'react';
import pt from 'prop-types';

import RatingOverview from './RatingOverview';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

const Review = ({ user, entryDate, texts, titles, ratings }) => {
  return (
    <div>
      <span>
        added by <strong>{user}</strong> On {formatDate(entryDate)}
      </span>
      <h2>{titles[Object.keys(titles)[0]]}</h2>
      <p>{texts[Object.keys(texts)[0]]}</p>
      <h2>Ratings of aspects</h2>
      {ratings && ratings.aspects && (
        <RatingOverview ratings={ratings.aspects} />
      )}
    </div>
  );
};

Review.propTypes = {
  user: pt.string.isRequired,
  entryDate: pt.number.isRequired,
  texts: pt.shape({}).isRequired,
  titles: pt.shape({}).isRequired,
  ratings: pt.shape({
    aspects: pt.shape({}),
  }).isRequired,
};

export default Review;
