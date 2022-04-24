const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require("../model/User");
var router = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/auth");

/* GET home page. */
router.get('/', checkAuthenticated, function(req, res, next) {
  res.render('../views/index.ejs');
});

router.get('/login', checkNotAuthenticated, function(req, res, next) {
  res.render('../views/login.ejs');
});

router.get('/register', checkNotAuthenticated, function(req, res, next) {
  res.render('../views/register.ejs');
});

router.get('/doodlPage', function(req, res, next) {
  var currentPrompt = req.app.locals.currentPrompt;
  res.render('../views/doodlPage.ejs', {currentPrompt : currentPrompt} );
});

router.get('/gallery', function(req, res, next) {
  res.render('../views/gallery.ejs');
});

router.get('/gdprPage', function(req, res, next) {
  res.render('../views/gdprPage.ejs');
});

router.get('/report', function(req, res, next) {
  res.render('../views/report.ejs');
});

router.get('/voting', function(req, res, next) {
  res.render('../views/voting.ejs');
});

router.post("/register", checkNotAuthenticated, async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("/register");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.redirect("/register");
    }
  }
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/doodlPage",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

module.exports = router;