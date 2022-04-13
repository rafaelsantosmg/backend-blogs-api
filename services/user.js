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

module.exports = {
  create,
  getAll,
};