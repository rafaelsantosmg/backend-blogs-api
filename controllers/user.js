const userService = require('../services/user');
const { createToken } = require('../utils/token');

const create = async (req, res) => {
  const user = await userService.create(req.body);
  const token = createToken(user);
  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(Number(id));
  return res.status(200).json(user);
};

module.exports = {
  create,
  getAll,
  getById,
};