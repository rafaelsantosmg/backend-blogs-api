const loginService = require('../services/login');
const { createToken } = require('../utils/token');

const login = async (req, res) => {
  const user = await loginService.login(req.body);
  const token = createToken(user);
  return res.status(200).json({ token });
};

module.exports = { login };