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

const getById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.dataValues.id;
  const post = await blogPostService.getById(Number(id), userId);
  return res.status(200).json(post);
};

module.exports = {
  create,
  getAll,
  getById,
};