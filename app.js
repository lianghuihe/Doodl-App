var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/routing');
var app = express();

//MUST BE DONE FIRST
app.use(methodOverride('_method'));

const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const uri = "mongodb+srv://doadmin:58QvrM41C390iFz6@db-mongodb-lon1-64588-a6408448.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-lon1-64588&tls=true&tlsCAFile=" +  path.join(__dirname,'ca-certificate.crt');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

app.set('views', path.join(__dirname, 'views')); // view engine setup
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

//test connection to mongoDB
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Using routes file ------------------------- reintegrate later
//app.use('/', indexRouter);

app.get('/', function(req, res, next) {
  res.render('index.ejs');
});

app.get('/login', function(req, res, next) {
  res.render('login.ejs');
});

app.get('/register', function(req, res, next) {
  res.render('register.ejs');
});

app.get('/doodlPage', function(req, res, next) {
  res.render('doodlPage.ejs');
});

app.get('/gallery', function(req, res, next) {
  res.render('gallery.ejs');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;