const { BlogPost, Category, User, PostsCategories } = require('../models');
const errors = require('../middlewares/errorMiddleware');

const create = async (userId, { title, categoryIds, content }) => {
  const categories = await Promise.all(categoryIds.map(async (categoryId) => {
    const findCategory = await Category.findOne({ where: { id: categoryId } });
    if (!findCategory) throw errors(400, '"categoryIds" not found');
    return findCategory;
  }));
  const createPost = await BlogPost.create({
    title,
    content,
    userId,
    categoryIds,
  });
  createPost.addCategory(categories);
  return createPost;
};

const getAll = async (userId) => {
  const getPosts = await BlogPost.findAll({ where: { userId } });
  const getUser = await User.findOne({ 
    where: { id: userId },
    attributes: { exclude: 'password' },
  });
  await Promise.all(getPosts.map(async (post) => {
    const posts = post.dataValues;
    const { dataValues: { categoryId } } = await PostsCategories.findOne({
      where: { postId: post.id },
    });
    const getCategory = await Category.findOne({ where: { id: categoryId } });
    posts.user = getUser.dataValues;
    posts.categories = [getCategory.dataValues];
    return posts;
  }));

  return getPosts;
};

const getById = async (id, userId) => {
  const getPost = await BlogPost.findOne({ where: { id } });
  if (!getPost) throw errors(404, 'Post does not exist');
  const getUser = await User.findOne({ 
    where: { id: userId },
    attributes: { exclude: 'password' },
  });
  const { dataValues: { categoryId } } = await PostsCategories.findOne({
    where: { postId: getPost.dataValues.id },
  });
  const getCategory = await Category.findOne({ where: { id: categoryId } });
  getPost.dataValues.user = getUser.dataValues;
  getPost.dataValues.categories = [getCategory.dataValues];

  return getPost;
};

module.exports = {
  create,
  getAll,
  getById,
};