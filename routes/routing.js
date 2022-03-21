var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});

router.get('/register', function(req, res, next) {
  res.render('register.ejs');
});

router.get('/doodlPage', function(req, res, next) {
  res.render('doodlPage.ejs');
});

router.get('/gallery', function(req, res, next) {
  res.render('gallery.ejs');
});

module.exports = router;