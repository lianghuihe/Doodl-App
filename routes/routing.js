require('dotenv').config({path: 'env/.env'});
const express = require('express');
var path = require('path');
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const Doodl = require("../model/doodl");
const Like = require("../model/Like");
const Report = require("../model/Report");
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

  for(var i = 0; i < doodls.length; i++){
      var reports = await Report.find({doodlID : doodls[i].id}).count();
      var likes = await Like.find({doodlID : doodls[i].id, type : "Like"}).count();
      var dislikes = await Like.find({doodlID : doodls[i].id, type : "Dislike"}).count();
      if(reports < 1) {
        doodlsData = doodlsData + "||" + doodls[i].username + "|" + doodls[i].doodl + "|" + likes + "|" + dislikes + "|" + doodls[i].id;
      };
  };

  var currentPrompt = global.currentPrompt;
  res.render('gallery.ejs', {currentPrompt : currentPrompt, doodlData : doodlsData});
});

router.get('/galleryGuest', checkNotAuthenticated, async function(req, res, next) {
  const todaysDate = new Date().toISOString().slice(0, 10)
  var doodls = await Doodl.find({date : todaysDate})
  var doodlsData;

  for(var i = 0; i < doodls.length; i++){
      var reports = await Report.find({doodlID : doodls[i].id}).count();
      var likes = await Like.find({doodlID : doodls[i].id, type : "Like"}).count();
      var dislikes = await Like.find({doodlID : doodls[i].id, type : "Dislike"}).count();
      if(reports < 1) {
        doodlsData = doodlsData + "||" + doodls[i].username + "|" + doodls[i].doodl + "|" + likes + "|" + dislikes + "|" + doodls[i].id;
      };
  };

  var currentPrompt = global.currentPrompt;
  res.render('gallery.ejs', {currentPrompt : currentPrompt, doodlData : doodlsData});
});

router.get('/account', checkAuthenticated, async function(req, res, next) {
  var doodls = await Doodl.find({username : req.user.name})
  var doodlsData;

  for(var i = 0; i < doodls.length; i++){
      doodlsData = doodlsData + "||" + doodls[i].date + "|" + doodls[i].prompt + "|" + doodls[i].doodl
  };

  res.render('account.ejs', {name : req.user.name, doodlData : doodlsData});
});

router.get('/gdprPage', function(req, res, next) {
  res.render('gdprPage.ejs');
});

router.get('/report', checkAuthenticated, function(req, res, next) {
  res.render('report.ejs', {doodlID: req.body.reportDoodlID});
});

router.post('/report', checkAuthenticated, function(req, res, next) {
  res.render('report.ejs', {doodlID: req.body.reportDoodlID});
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

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
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
    var randNum =  Math.floor(Math.random() * 99999999) + 1;
    var found = await Doodl.findOne({id: randNum});

    while(found){
      randNum =  Math.floor(Math.random() * 99999999) + 1;
      found = await Doodl.findOne({id: randNum});
    }
    const doodl = new Doodl({
      id: randNum,
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

router.post("/gallery", checkAuthenticated, async (req, res) => {
  const likeFound = await Like.findOne({ username: req.user.name, doodlID: req.body.doodlID, type: req.body.likeType});
  if(likeFound){ 
    try {
      var conditions = {username: req.user.name, doodlID: req.body.doodlID, type: req.body.likeType};
      await Like.deleteOne(conditions);
      res.redirect("/gallery");
    } catch (error) {
      console.log(error)
      req.flash("error", "Sorry, we can't update your opinion on that doodl right now");
      res.redirect("/gallery");
    }
  }else{  
    const differentLikeFound = await Like.findOne({ username: req.user.name, doodlID: req.body.doodlID});  
    if(differentLikeFound){
      try {
        var conditions = {username: req.user.name, doodlID: req.body.doodlID};
        var update = {type : req.body.likeType};
        await Like.updateOne(conditions, update);
        res.redirect("/gallery");
      } catch (error) {
        console.log(error)
        req.flash("error", "Sorry, we can't update your opinion on that doodl right now");
        res.redirect("/gallery");
      }
    }else{  
      try {
        var randNum =  Math.floor(Math.random() * 99999999) + 1;
        var found = await Like.findOne({id: randNum});

        while(found){
          randNum =  Math.floor(Math.random() * 99999999) + 1;
          found = await Like.findOne({id: randNum});
        }
        const like = new Like({
          id: randNum,
          username: req.user.name,
          doodlID: req.body.doodlID,
          type: req.body.likeType,
        });
        await like.save();
        res.redirect("/gallery");
      } catch (error) {
        console.log(error);
        res.redirect("/gallery");
      }
    }
  }
});

router.post("/submitReport", checkAuthenticated, async (req, res) => {
  const reportFound = await Report.findOne({ username: req.user.name, doodlID: req.body.doodlID});
  if(reportFound){ 
    req.flash("error", "You have already reported that doodl");
    res.redirect("/gallery");
  }else{  
    try {
      var randNum =  Math.floor(Math.random() * 99999999) + 1;
      var found = await Report.findOne({id: randNum});
      while(found){
        randNum =  Math.floor(Math.random() * 99999999) + 1;
        found = await Report.findOne({id: randNum});
      }
      const report = new Report({
        id: randNum,
        username: req.user.name,
        doodlID: req.body.doodlID,
        desc: req.body.report,
      });
      await report.save();
      req.flash("successMessage", "Your report has been registered");
      res.redirect("/gallery");

    } catch (error) {
      console.log(error);
      req.flash("error", "Sorry we have encountered an issue");
      res.redirect("/gallery");
    }
  } 
});

module.exports = router;