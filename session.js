const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

const sessionMiddleware = () => {
  const sessionConfig = {
    secret: 'your-secret-key',
    genid: (req) => uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  };

  return session(sessionConfig);
};

module.exports = sessionMiddleware;
