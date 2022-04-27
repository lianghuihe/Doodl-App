require('dotenv').config({path: 'env/.env'});
const express = require('express');
var path = require('path');
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const Doodl = require("../model/doodl");
const passport = require('passport');
const router = express();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/auth");

// GET home page //

router.get('/', checkNotAuthenticated, function(req, res, next) {
  res.render('index.ejs');
});

router.get('/login', checkNotAuthenticated, function(req, res, next) {
  res.render('login.ejs');
});

router.get('/register', checkNotAuthenticated, function(req, res, next) {
  res.render('register.ejs');
});

router.get('/doodlPage', checkAuthenticated, function(req, res, next) {
  var currentPrompt = global.currentPrompt;
  res.render('doodlPage.ejs', {currentPrompt : currentPrompt, name: req.user.name, email: req.user.email} );
  res.locals.user = req.user;
});

router.get('/doodlPageGuest', checkNotAuthenticated, function(req, res, next) {
  var currentPrompt = global.currentPrompt;
  res.render('doodlPageGuest.ejs', {currentPrompt : currentPrompt} );
});

router.get('/gallery', checkAuthenticated, function(req, res, next) {
  res.render('gallery.ejs');
  res.locals.user = req.user;
});

router.get('/gdprPage', checkAuthenticated, function(req, res, next) {
  res.render('gdprPage.ejs');
  res.locals.user = req.user;
});

router.get('/report', checkAuthenticated, function(req, res, next) {
  res.render('report.ejs');
  res.locals.user = req.user;
});

router.get('/voting', checkAuthenticated, function(req, res, next) {
  res.render('voting.ejs');
  res.locals.user = req.user;
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

router.post("/login", checkNotAuthenticated,
  passport.authenticate("local", {successRedirect: "/doodlPage", failureRedirect: "/login", failureFlash: true, }),
  function(req, res) {
    req.session.user = req.user;
    res.locals.user = passport.locals;
    console.log(passport);
  }
);

router.post("/doodlPage", checkAuthenticated, async (req, res) => {
  try {
    var todayDate = new Date().toISOString().slice(0, 10);

    console.log("4");
    console.log(req.user);
    console.log("5");
    console.log(req.user.name);
    console.log("6");
    console.log(req.user.email);
    console.log("7")

    const doodl = new Doodl({
      email: req.user.email,
      doodl: req.body.hiddenCanvasValue,
      prompt: global.currentPrompt,
      date: todayDate,
    });

    await doodl.save();
    res.redirect("/gallery");

  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;