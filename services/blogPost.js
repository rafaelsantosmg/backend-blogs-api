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
  const getPosts = await BlogPost.findAll({ 
    where: { userId },
    include: [
      { model: User,
      as: 'user',
      attributes: { exclude: ['password'] } },
      { model: Category,
      as: 'categories',
      through: { attributes: [] },
    },
    ],
  });

  return getPosts;
};

const getById = async (id) => {
  const getPost = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] } },
        { model: Category,
          as: 'categories',
          through: { attributes: [] },
        },
      ],
    });

  if (!getPost) throw errors(404, 'Post does not exist');

  return getPost;
};

const update = async (id, userId, post) => {
  if (post.categoryIds) throw errors(400, 'Categories cannot be edited');
  const getPost = await BlogPost.findOne({ where: { id } });
  if (getPost.dataValues.userId !== userId) throw errors(401, 'Unauthorized user');
  const { dataValues: { categoryId } } = await PostsCategories.findOne({
    where: { postId: getPost.dataValues.id },
  });
  const getCategory = await Category.findOne({ where: { id: categoryId } });
  await BlogPost.update({
    title: post.title,
    content: post.content,
    updated: new Date(),
  }, { where: { id } });
  return {
    title: post.title,
    content: post.content,
    userId,
    categories: [getCategory.dataValues],
  };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};