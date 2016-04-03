var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/articles', function(req, res, next) {
  res.render('articles', {});
});

router.get('/articles/:group', function(req, res, next) {
  res.render('articles_group', {});
});

router.get('/articles/:group/:id', function(req, res, next) {
  res.render('article_item', {});
});

router.get('/media', function(req, res, next) {
  res.render('media', {});
});

router.get('/offer', function(req, res, next) {
  res.render('offer', {});
});
module.exports = router;
