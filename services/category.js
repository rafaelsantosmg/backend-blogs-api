const { Category } = require('../models');
const errors = require('../middlewares/errorMiddleware');

const create = async (category) => {
  const findCategory = await Category.findOne({ where: { name: category.name } });
  if (findCategory) throw errors(409, 'Category already registered');
  const createCategory = await Category.create({
    name: category.name,
  });
  return createCategory;
};

module.exports = {
  create,
};