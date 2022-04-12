// ./auth/validateJWT.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ 
      where: { email: decoded.data.email },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};