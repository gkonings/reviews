var express = require('express');
var _ = require('underscore');
var router = express.Router();

var reviews = require('../api/reviews.json');
var util = require('../_util');

router.get('/', function(req, res) {
  let { start = 1, limit, filterBy, sortBy = 'entryDate' } = req.query;
  let data = _.sortBy(reviews, sortBy).reverse(); // reverse to sort desc
  let filtered = data.filter(review =>
    filterBy ? review.traveledWith === filterBy : true
  );
  let paginated = filtered.slice(start - 1, limit);
  res.json({ all: data, filtered: filtered, limited: paginated });
});

router.get('/average', function(req, res) {
  let { generalAvg, aspecsAvg } = util.getAverageRatings(reviews);
  let traveledWithAvg = util.getAverageTravelledWith(reviews);
  res.json({ generalAvg, aspecsAvg, traveledWithAvg });
});

module.exports = router;
