// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect('/login');
    }
  
    try {
      const decodedToken = jwt.verify(token, secret);
      req.userId = decodedToken.userId;
      next();
    } catch (e) {
      console.log(e);
      res.redirect('/login');
    }
  };

  module.exports = authenticateUser;
  