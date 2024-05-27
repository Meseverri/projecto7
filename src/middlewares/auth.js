const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwt_token);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ error: 'Access denied. You do not have the required role.' });
    }
    next();
  };
};



module.exports = { authenticateUser, authorizeRoles };