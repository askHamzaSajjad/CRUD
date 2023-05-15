const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');//JWT token
const bodyParser = require('body-parser');
const session = require('express-session');
// Models
const User = require('../models/userschema');
const Item = require('../models/itemschema'); // Import the User model
const {isAuthenticated} = require('../middleware/authenticator')
const controller = require('../controller/CRUD_controller');

 

router.use(bodyParser.json());
// router.use(isAuthenticated);

// Post Requests
// ******************************************************************************
  router.post('/register',controller.registerController);            //********// 
  router.post('/login',controller.loginController);                  //********//  
  router.post('/updateitems',controller.updateItemController);       //********// 
  router.post('/deleteitem', controller.deleteItemController);       //********// 
  router.post('/additems', controller.addItemController);            //********// 
// ******************************************************************************

  // Get requests 
// ******************************************************************************
  router.get('/login',controller.login_page);                         //*******// 
  router.get('/register',controller.register);                        //*******// 
  router.get('/additems',controller.add_getController);               //*******//                                      
  router.get('/delete',controller.delete_getController);              //*******//
  router.get('/updateitems',controller.update_getController);         //*******//
  router.get('/getusers',controller.getusersController);              //*******//
                                                                      //*******// 
// ******************************************************************************


module.exports = router;
