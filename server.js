const express = require('express');
// const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
// const PORT = 4500;
// app.use(cors());
// app.use(express.json()); 
const MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var db, collection;

const url = "mongodb+srv://angelmorris920:iXEnI3muhbDneiaN@cluster0.ydoz6.mongodb.net/";
const dbName = "DemoDay";

app.listen(4400, () => {
 console.log("can you see me")
    MongoClient.connect(url, { }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

// Test route for frontend-backend connection

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Backend is connected to frontend!' });
// });

app.get('/', (req, res) => {// default page happen on refresh
  db.collection('DemoDay').find().toArray((err, result) => {//go to db and finds all of the
    if (err) return console.log(err)//reading the html 
    res.render('index.ejs', {messages: result})
  })
})

app.get('/families', (req, res) => {// renders family portal
  db.collection('DemoDay').find().toArray((err, result) => {//go to db and finds all of the
    if (err) return console.log(err)//reading the html 
    res.render('families.ejs', {messages: result})
  })
})

app.get('/providers', (req, res) => {// renders family portal
  db.collection('DemoDay').find().toArray((err, result) => {//go to db and finds all of the
    if (err) return console.log(err)//reading the html 
    res.render('providers.ejs', {messages: result})
  })
})
// app.post('/sendmsg', (req, res) => {// this is taking the form and sending it to the database
//   db.collection('DemoDay').insertOne({name: req.body.name, msg: req.body.msg, thumbUp: 0}, (err, result) => {
//     if (err) return console.log(err)//^ this is telling the database to add one
//     console.log('saved to database')
//     res.redirect('/')//refrsh, back to homepage
//   })
// })

