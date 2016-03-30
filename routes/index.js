var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/articles', function(req, res, next) {
  res.render('articles', {});
});

router.get('/articles/:id', function(req, res, next) {
  res.render('article_item', {});
});

router.get('/media', function(req, res, next) {
  res.render('media', {});
});
module.exports = router;
