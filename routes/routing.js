require('dotenv').config({path: 'env/.env'});
const express = require('express');
var path = require('path');
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const User = require("../model/User");
const uri = "mongodb+srv://doadmin:58QvrM41C390iFz6@db-mongodb-lon1-64588-a6408448.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-lon1-64588&tls=true&tlsCAFile=" +  path.join(__dirname,'ca-certificate.crt');
const passport = require('passport');
const router = express();

/*
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/auth");

const initializePassport = require("./passport-config");
initializePassport(
  passport,
  async (email) => {
    const userFound = await User.findOne({ email });
    return userFound;
  },
  async (id) => {
    const userFound = await User.findOne({ _id: id });
    return userFound;
  }
);


mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to database");
});

 GET home page. 
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
  var currentPrompt = req.app.locals.currentPrompt;
  res.render('doodlPage.ejs', {currentPrompt : currentPrompt} );
});

router.get('/doodlPageGuest', checkNotAuthenticated, function(req, res, next) {
  var currentPrompt = req.app.locals.currentPrompt;
  res.render('doodlPageGuest.ejs', {currentPrompt : currentPrompt} );
});

router.get('/gallery', checkAuthenticated, function(req, res, next) {
  res.render('gallery.ejs');
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

router.post("/register", checkAuthenticated, async (req, res) => {
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

*/

module.exports = router;