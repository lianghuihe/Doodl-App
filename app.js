var csv = require('jquery-csv');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/routing');
const secureRouter = require('./routes/secure-routes');
var app = express();
const mongoose = require('mongoose');
const uri = "mongodb+srv://doadmin:58QvrM41C390iFz6@db-mongodb-lon1-64588-a6408448.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-lon1-64588&tls=true&tlsCAFile=" +  path.join(__dirname,'ca-certificate.crt');
const passport = require('passport');
require('./auth/auth');

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

//Temporary users array ----------------- replace with DB calls
const users = []

//Connect to database
mongoose.connect(uri);
const db = mongoose.connection;
mongoose.Promise = global.Promise;

var currentPrompt = "";
var count = 0;
const wordArray = $.csv.toArray("./public/wordList.csv");
app.locals.currentPrompt = wordArray[count];
//app.locals.testString = "Popcorn";

(function loop(){
  setTimeout(function(){
    count += 1;
    app.locals.currentPrompt = wordArray[count];
  }, 86400000);
}());

app.set('views', path.join(__dirname, 'views')); // view engine setup
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//test connection to mongoDB
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use('/', indexRouter);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRouter);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
