const { BlogPost, Category } = require('../models');
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

const getAll = async () => {
  const getCategories = await BlogPost.findAll();
  return getCategories;
};

module.exports = {
  create,
  getAll,
};