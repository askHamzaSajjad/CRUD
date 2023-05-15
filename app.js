// Importing Libraries
const path = require('path');
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");//bcrypt package
const User = require('./models/userschema'); // path to the user schema file
// const authenticateUser = require('./middleware/authenticator');//middleware to authenticate
const mongoose = require('mongoose');
const itemsRouter = require('./routes/users');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session'); 

// app.use(connectToDatabase);
// Parse incoming request bodies in a middleware before your handlers
// Creating databaseconnection
// ****************************************************************
const dbString = 'mongodb+srv://askhamza:g9867542310@cluster0.0hhnuox.mongodb.net/test';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(dbString, dbOptions)
    .then(() => {
      console.log('MongoDB connected');
      // Set the database connection on the request object
      db = mongoose.connection;
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
// ****************************************************************
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs');

// *****************Session middleware************************************************///
const MongoDBStore = require('connect-mongodb-session')(session);              //*****///
const store = new MongoDBStore({                                               //*****///
  uri: 'mongodb+srv://askhamza:g9867542310@cluster0.0hhnuox.mongodb.net/test', //*****///
  collection: 'sessions'});                                                    //*****///
app.use(session({                                                              //*****///
  secret: 'mysecret',                                                          //*****///
  resave: false,                                                               //*****///
  saveUninitialized: false,                                                    //*****///
  store                                                                        //*****///
}));                                                                           //*****///
// ***********************************************************************************///


// only one base route
app.use(methodOverride('_method'));
app.use('/', itemsRouter);

// End Routes


app.listen(3000);