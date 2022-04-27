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
  res.render('doodlPage.ejs', {currentPrompt : currentPrompt} );
});

router.get('/doodlPageGuest', checkNotAuthenticated, function(req, res, next) {
  var currentPrompt = global.currentPrompt;
  res.render('doodlPageGuest.ejs', {currentPrompt : currentPrompt} );
});

router.get('/gallery', checkAuthenticated, async function(req, res, next) {
  const todaysDate = new Date().toISOString().slice(0, 10)
  var doodls = await Doodl.find({date : todaysDate})
  var doodlsData;

  //console.log("1");
  //console.log(doodls);
  //console.log("2");
  //console.log(doodls[0]);
  //console.log("3");
  
  for(var i = 0; i < doodls.length; i++){
      doodlsData[i][0] = doodls[i].username
      doodlsData[i][1] = doodls[i].doodl
  };

  console.log(doodlsData);

  var currentPrompt = global.currentPrompt;
  res.render('gallery.ejs', {currentPrompt : currentPrompt, doodlData : doodlsData});
});

router.get('/gdprPage', checkAuthenticated, function(req, res, next) {
  res.render('gdprPage.ejs');
});

router.get('/report', checkAuthenticated, function(req, res, next) {
  res.render('report.ejs');
});

router.get('/voting', checkAuthenticated, function(req, res, next) {
  res.render('voting.ejs');
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
  passport.authenticate("local", {failureRedirect: "/login", failureFlash: true, }),
  function(req, res) {
    res.redirect("/doodlPage");
  }
);

router.post("/doodlPage", checkAuthenticated, async (req, res) => {
  try {
    var todayDate = new Date().toISOString().slice(0, 10);

    const doodl = new Doodl({
      id: (await Doodl.find().count()) + 1,
      username: req.user.name,
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