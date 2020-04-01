var express = require('express');
var router = express.Router();

/* GET root route. */
router.get('/', function(req, res, next) {
  res.send('zoover api root, use /reviews to get reviews data');
});

module.exports = router;
