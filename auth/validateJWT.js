// ./auth/validateJWT.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ 
      where: { email: decoded.data.email },
    });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};