// Import the required modules and dependencies
const session = require('express-session');
const bcrypt = require('bcrypt');
const Item = require('../models/itemschema');
const User = require('../models/userschema');

// ***************************************************************************************
// **********************************POST Controllers*************************************
// ***************************************************************************************
const registerController =async(req, res, next) => {
    try {
      const hashedpassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedpassword
      });
      console.log(user);
      const result = await user.save();
      console.log(result);
      res.redirect('/login');
    } catch (e) {
      console.error(e);
      res.redirect('/register');
      next(e);
    }
  };

const loginController = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log(user);
      // Verify user credentials
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.redirect('/login');
      }
      req.session.user = { id: user._id, name: user.name };
      res.redirect('/getusers');
    } catch (e) {
      console.error(e);
      res.redirect('/login');
      next(e);
    }
  };

const deleteItemController = async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) {
      return res.status(404).send({ message: 'Item not found.' });
    }
    return res.redirect("/getusers");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'An error occurred while deleting the item.' });
  }
};

const updateItemController = async (req, res) => {
    try {
      const name = req.body.name;
      const price = req.body.price;
      const description = req.body.description;
      // const item = await Items.findById(req.body.id);
      updatedItem = await Item.updateOne({_id: req.body.id }, { name: name, price: price, description: description });
      console.log(updatedItem);
      if (!updatedItem) {
        return res.status(404).send();
      }
      else{
      return res.redirect('/getusers');
    }}
    catch (error) {
      res.status(500).send(error);
    }
};

const addItemController =  async (req, res, next) => {
    try {
      const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      });
      const result = await newItem.save();
      console.log(`Inserted ${result.insertedCount} item(s).`);
      return res.redirect('/getusers');
    } catch (err) {
      console.error('Error adding item to database:', err);
      return res.status(500).send('Error adding item to database');
      next(err);
    }};


// ***************************************************************************************
// ***************************************************************************************
// ***************************************************************************************

// ***************************************************************************************
// **********************************GET Controllers**************************************
// ***************************************************************************************

const add_getController =  async(req, res) => {                             
  res.render('additems')}                                                    
const delete_getController = async (req, res) => {
  try {
    const items = await Item.find().exec();
    console.log(items);
    return res.render('delete', { items:items });
  } catch (error) {
    res.status(500).send(error);
  }
};                                                                           
const update_getController = async (req, res) => {
  try {
    const items = await Item.find().exec();
    console.log(items);
    return res.render('update-items', { items });
  } catch (error) {
    res.status(500).send(error);
  }
};                                                                           
const getusersController = async (req, res, next) => {
  try {
    const name = req.body.id;
    const data = await Item.find().exec();
    return res.render('index', { items: data });
  } catch (err) {
    console.error('Error reading data from database:', err);
    return res.status(500).send('Error reading data from database');
    next(err);
  }
};
// ****************************************************************************************
// ****************************************************************************************
// ****************************************************************************************
// Export the controller function
module.exports = {deleteItemController, updateItemController,
  addItemController,registerController,loginController,
  add_getController,delete_getController,update_getController,getusersController};
