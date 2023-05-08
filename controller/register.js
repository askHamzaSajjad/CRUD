const bcrypt = require('bcrypt');
const User = require('./models/schema');

async function registerUser(req, res) {
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
  }
}

module.exports = registerUser;
