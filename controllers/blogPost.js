const blogPostService = require('../services/blogPost');

const create = async (req, res) => {
  const userId = req.user.dataValues.id;
  const post = await blogPostService.create(userId, req.body);
  return res.status(201).json(post);
};

const getAll = async (_req, res) => {
  const categories = await blogPostService.getAll();
  return res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};