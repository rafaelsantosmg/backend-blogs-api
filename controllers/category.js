const categoryService = require('../services/category');

const create = async (req, res) => {
  const category = await categoryService.create(req.body);
  return res.status(201).json(category);
};

module.exports = {
  create,
};