const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('./model/model');
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

router.get('/gdprPage', function(req, res, next) {
  res.render('gdprPage.ejs');
});

router.get('/report', function(req, res, next) {
  res.render('report.ejs');
});

router.get('/voting', function(req, res, next) {
  res.render('voting.ejs');
});

router.post('/register',
  passport.authenticate('register', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post('/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;