const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require("../model/User");
const router = express();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/auth");

/* GET home page. */
router.get('/', checkNotAuthenticated, function(req, res, next) {
  res.render('index.ejs');
});

router.get('views/login.ejs', checkNotAuthenticated, function(req, res, next) {
  res.render('login.ejs');
});

router.get('views/register.ejs', checkNotAuthenticated, function(req, res, next) {
  res.render('register.ejs');
});

router.get('views/doodlPage.ejs', checkAuthenticated, function(req, res, next) {
  var currentPrompt = req.app.locals.currentPrompt;
  res.render('doodlPage.ejs', {currentPrompt : currentPrompt} );
});

router.get('views/gallery.ejs', checkAuthenticated, function(req, res, next) {
  res.render('gallery.ejs');
});

router.get('views/gdprPage.ejs', checkAuthenticated, function(req, res, next) {
  res.render('gdprPage.ejs');
});

router.get('views/report.ejs', checkAuthenticated, function(req, res, next) {
  res.render('report.ejs');
});

router.get('views/voting.ejs', checkAuthenticated, function(req, res, next) {
  res.render('voting.ejs');
});

router.post("views/register.ejs", checkAuthenticated, async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });

  if (userFound) {
    req.flash("error", "User with that email already exists");
    res.redirect("views/register.ejs");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      await user.save();
      res.redirect("views/login.ejs");
    } catch (error) {
      console.log(error);
      res.redirect("views/register.ejs");
    }
  }
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("views/login.ejs");
});

router.post(
  "views/login.ejs",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "views/doodlPage.ejs",
    failureRedirect: "views/login.ejs",
    failureFlash: true,
  })
);

module.exports = router;