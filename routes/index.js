var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/doodlPage', function(req, res, next) {
  res.render('doodlPage');
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery');
});

module.exports = router;