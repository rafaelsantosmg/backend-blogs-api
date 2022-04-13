const { User } = require('../models');
const errors = require('../middlewares/errorMiddleware');

const login = async (user) => {
  const findUser = await User.findOne({ where: { email: user.email } });
  if (!findUser) throw errors(400, 'Invalid fields');
  return findUser;
};

module.exports = { login };