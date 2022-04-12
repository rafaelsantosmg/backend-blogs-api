const userService = require('../services/user');

const create = async (req, res) => {
  const user = await userService.create(req.body);
  return res.status(201).json(user);
};

module.exports = {
  create,
};