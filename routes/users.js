const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');//JWT token
const bodyParser = require('body-parser');
const session = require('express-session');
// Models
const User = require('../models/userschema');
const Item = require('../models/itemschema'); // Import the User model
const {deleteItemController,
       updateItemController,
       addItemController,
       registerController, 
       loginController,
       add_getController,
       delete_getController,
       update_getController,
       getusersController} = require('../controller/CRUD_controller');


// **************************************
router.use(session({            //*******
  secret: 'cbsnijf',            //*******
  resave:false,                 //*******
  saveUninitialized: true,      //*******
  cookie: { maxAge: 60*60*1000} //*******
  }));                          //*******
// **************************************

router.use(bodyParser.json());

// Post Requests
// ******************************************************************************
  router.post('/register',registerController);                       //********** 
  router.post('/login',loginController);                             //**********  
  router.post('/updateitems',updateItemController);                  //**********  
  router.post('/deleteitem', deleteItemController);                  //**********  
  router.post('/additems', addItemController);                       //**********  
// ******************************************************************************

  // Get requests 
// ******************************************************************************
  router.get('/additems',add_getController);                          //*********                                        
  router.get('/delete', delete_getController);                        //*********
  router.get('/updateitems',update_getController);                    //*********
  router.get('/getusers', getusersController);                        //*********
                                                                      //********* 
// ******************************************************************************


module.exports = router;
