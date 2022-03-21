//setting up dependencies
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require("./routes")
const path = require('path');
const app = express()
const port = 3000
const uri = "mongodb+srv://doadmin:58QvrM41C390iFz6@db-mongodb-lon1-64588-a6408448.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-lon1-64588&tls=true&tlsCAFile=" +  path.join(__dirname,'ca-certificate.crt');

app.use(router);                //to use created routes to access the DB
app.use(express.json());       //to support JSON

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

mongoose.connect(uri);

//test connection to mongoDB
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/', checkAuthenticated, (req, res) => {
  res.render('doodlMainApp/index.html', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('doodlMainApp/login.html')
})

//Starting server on defined port
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})