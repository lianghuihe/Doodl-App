require('dotenv').config({path: 'env/.env'});
const csv = require('csv-parser')
const fs = require('fs')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var indexRouter = require(path.join(__dirname, '/routes/routing.js'));
var app = express();
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const User = require("./model/User");
const uri = "mongodb+srv://doadmin:58QvrM41C390iFz6@db-mongodb-lon1-64588-a6408448.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-lon1-64588&tls=true&tlsCAFile=" +  path.join(__dirname,'ca-certificate.crt');
const passport = require('passport');
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("./auth/auth");

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

//Temporary users array ----------------- replace with DB calls
//const users = []

//Connect to database
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
mongoose.Promise = global.Promise;

var currentPrompt = "";
var count = 0;
const wordArray = [];

fs.createReadStream('./public/wordList.csv')
  .pipe(csv())
  .on('data', (data) => wordArray.push(data))
  .on('end', () => {
    app.locals.currentPrompt = wordArray[count].word;
  });

(function loop(){
  setTimeout(function(){
    count += 1;
    app.locals.currentPrompt = wordArray[count].word;
  }, 86400000);
}());

//app.set('views', path.join(__dirname, 'views')); // view engine setup
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//test connection to mongoDB
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to database");
});

//app.use('/', indexRouter);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('/', checkAuthenticated, function(req, res, next) {
  res.render('index.ejs');
});

app.get('views/login.ejs', checkNotAuthenticated, function(req, res, next) {
  res.render('login.ejs');
});

app.get('views/register.ejs', checkNotAuthenticated, function(req, res, next) {
  res.render('register.ejs');
});

app.get('views/doodlPage.ejs', checkNotAuthenticated, function(req, res, next) {
  var currentPrompt = req.app.locals.currentPrompt;
  res.render('doodlPage.ejs', {currentPrompt : currentPrompt} );
});

app.get('views/gallery.ejs', checkNotAuthenticated, function(req, res, next) {
  res.render('gallery.ejs');
});

app.get('views/gdprPage.ejs', checkNotAuthenticated, function(req, res, next) {
  res.render('gdprPage.ejs');
});

app.get('views/report.ejs', checkNotAuthenticated, function(req, res, next) {
  res.render('report.ejs');
});

app.get('views/voting.ejs', checkNotAuthenticated, function(req, res, next) {
  res.render('voting.ejs');
});

app.post("views/register.ejs", checkNotAuthenticated, async (req, res) => {
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

app.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("views/login.ejs");
});

app.post(
  "views/login.ejs",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "views/doodlPage.ejs",
    failureRedirect: "views/login.ejs",
    failureFlash: true,
  })
);

//module.exports = router;
module.exports = app;
