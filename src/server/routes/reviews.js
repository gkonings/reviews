const express = require('express');
const _ = require('underscore');

const router = express.Router();

const reviews = require('../api/reviews.json');
const util = require('../_util');

router.get('/', (req, res) => {
  const { start = 0, limit = 5, filterBy, sortBy = 'entryDate' } = req.query;
  const data = _.sortBy(reviews, sortBy).reverse(); // reverse to sort desc
  const filtered = data.filter((review) =>
    filterBy ? review.traveledWith === filterBy : true
  );
  const paginated = filtered.slice(
    parseInt(start, 10),
    parseInt(start, 10) + parseInt(limit, 10)
  );
  const pagination = {
    numPages: Math.ceil(filtered.length / limit) || filtered.length,
    curPage: Math.ceil((start - 1) / limit) + 1 || 1,
    start: parseInt(start, 10),
    limit: parseInt(limit, 10),
    length: filtered.length,
  };
  res.json({
    reviews: paginated,
    pagination,
  });
});

router.get('/average', (req, res) => {
  const { generalAvg, aspecsAvg } = util.getAverageRatings(reviews);
  const traveledWithAvg = util.getAverageTravelledWith(reviews);
  res.json({ generalAvg, aspecsAvg, traveledWithAvg });
});

module.exports = router;
