import React from 'react';
import pt from 'prop-types';

import formatDate from '../utils/formatDate';
import Score from './score/Score';
import ScoreOverview from './score/ScoreOverview';

const Review = ({
  user,
  entryDate,
  travelDate,
  traveledWith,
  texts,
  titles,
  ratings,
}) => (
  <div>
    <span>
      added by <strong>{user}</strong> On {formatDate(entryDate)}
    </span>
    <h2>{titles[Object.keys(titles)[0]]}</h2>
    <p>{texts[Object.keys(texts)[0]]}</p>
    <h2>Ratings of aspects</h2>
    {ratings && ratings.aspects && <ScoreOverview ratings={ratings.aspects} />}
    <aside>
      {ratings && ratings.general && ratings.general.general && (
        <Score title="general" value={ratings.general.general} />
      )}

      <div>
        About the trip date: {formatDate(travelDate)}
        with: {traveledWith}
      </div>
    </aside>
    <hr />
  </div>
);

Review.propTypes = {
  user: pt.string.isRequired,
  entryDate: pt.number.isRequired,
  travelDate: pt.number.isRequired,
  traveledWith: pt.string.isRequired,
  texts: pt.shape({}).isRequired,
  titles: pt.shape({}).isRequired,
  ratings: pt.shape({
    aspects: pt.shape({}),
    general: pt.shape({
      general: pt.number,
    }),
  }).isRequired,
};

export default Review;
