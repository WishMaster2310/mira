var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/articles', function(req, res, next) {
  res.render('articles', {"ActiveMenu": 2});
});

router.get('/articles/:group', function(req, res, next) {
  res.render('articles_group', {"ActiveMenu": 2});
});

router.get('/articles/:group/:id', function(req, res, next) {
  res.render('article_item', {"ActiveMenu": 2});
});

router.get('/media', function(req, res, next) {
  res.render('media', {"ActiveMenu": 1});
});

router.get('/services', function(req, res, next) {
  res.render('services', {"ActiveMenu": 0});
});

router.get('/offer', function(req, res, next) {
  res.render('offer', {"ActiveMenu": 0});
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts', {"ActiveMenu": 3});
});
router.get('/vacancy', function(req, res, next) {
  res.render('vacancy', {});
});
module.exports = router;
