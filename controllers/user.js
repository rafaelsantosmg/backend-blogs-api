const userService = require('../services/user');
const { createToken } = require('../utils/token');

const create = async (req, res) => {
  const user = await userService.create(req.body);
  const token = createToken(user);
  return res.status(201).json({ token });
};

module.exports = {
  create,
};