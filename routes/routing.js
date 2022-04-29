require('dotenv').config({path: 'env/.env'});
const express = require('express');
var path = require('path');
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const Doodl = require("../model/doodl");
const Like = require("../model/Like");
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
      var likes = await Like.find({doodlID : doodls[i].id, type : "Like"}).count();
      var dislikes = await Like.find({doodlID : doodls[i].id, type : "Dislike"}).count();
      //var total = likes - dislikes;
      doodlsData = doodlsData + "||" + doodls[i].username + "|" + doodls[i].doodl + "|" + likes + "|" + dislikes + "|" + doodls[i].id
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

router.post("/like", checkAuthenticated, async (req, res) => {
  const likeFound = await Like.findOne({ username: req.user.name, doodlID: req.body.likeDoodlID, type: req.body.likeType});
  if(likeFound){ 
    req.flash("error", "You have already given your opinion on that doodl");
    res.redirect("/gallery");
  }else{  
    const differentLikeFound = await Like.findOne({ username: req.user.name, doodlID: req.body.likeDoodlID});  
    if(differentLikeFound){
      try {
        var conditions = {username: req.user.name, doodlID: req.body.likeDoodlID};
        var update = {type : "Like"};
        await Like.updateOne(conditions, update);
      } catch (error) {
        console.log(error)
        req.flash("error", "Sorry, we can't update your opinion on that doodl right now");
        res.redirect("/gallery");
      }
    }else{  
      try {
        const like = new Like({
          id: (await Like.find().count()) + 1,
          username: req.user.name,
          doodlID: req.body.likeDoodlID,
          type: "Like",
        });
        await like.save();
        res.redirect("/gallery");
      } catch (error) {
        console.log(error);
      }
    }
  }
});


module.exports = router;