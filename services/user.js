const { User } = require('../models');
const errors = require('../middlewares/errorMiddleware');

const create = async (user) => {
  const findUser = await User.findOne({ where: { email: user.email } });
  if (findUser) throw errors(409, 'User already registered');
  const createUser = await User.create({
    displayName: user.displayName,
    email: user.email,
    password: user.password,
    image: user.image,
  });
  return createUser;
};

const getAll = async () => {
  const getUsers = await User.findAll({ attributes: { exclude: 'password' } });
  return getUsers;
};

const getById = async (id) => {
  const getUser = await User.findOne({
    where: { id },
    attributes: { exclude: 'password' },
  });
  if (!getUser) throw errors(404, 'User does not exist');
  return getUser;
};

const destroy = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  destroy,
};