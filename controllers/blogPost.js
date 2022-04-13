const blogPostService = require('../services/blogPost');

const create = async (req, res) => {
  const userId = req.user.dataValues.id;
  const post = await blogPostService.create(userId, req.body);
  return res.status(201).json(post);
};

const getAll = async (req, res) => {
  const userId = req.user.dataValues.id;
  const posts = await blogPostService.getAll(userId);
  return res.status(200).json(posts);
};

module.exports = {
  create,
  getAll,
};