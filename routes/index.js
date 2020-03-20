var express = require('express');
var router = express.Router();

let connect = require('../connect');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { moments: connect.retrievedData });
});

module.exports = router;
