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
  const post = await blogPostService.getById(Number(id));
  return res.status(200).json(post);
};

const update = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.dataValues.id;
  const post = await blogPostService.update(Number(id), userId, req.body);
  return res.status(200).json(post);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.dataValues.id;
  await blogPostService.destroy(Number(id), userId);
  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  destroy,
};