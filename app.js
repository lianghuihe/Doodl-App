require('dotenv').config({path: 'env/.env'});
const csv = require('csv-parser')
const fs = require('fs')
var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/routing.js');
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const User = require("./model/User");
const Doodl = require("./model/doodl");
const uri = "mongodb+srv://doadmin:58QvrM41C390iFz6@db-mongodb-lon1-64588-a6408448.mongo.ondigitalocean.com/DoodlData?retryWrites=true&authSource=admin&replicaSet=db-mongodb-lon1-64588&tls=true&tlsCAFile=" +  path.join(__dirname,'ca-certificate.crt');
const passport = require('passport');
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
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(express.static('public'));

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
  next(createError(404));
});
*/

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
    console.log("Connected to database successfully");
});

app.use('/', indexRouter);
module.exports = app;