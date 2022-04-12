const Category = (model, through) => {
  model.Category.belongsToMany(model.BlogPost, {
    as: 'posts',
    through,
    foreignKey: 'categoryId',
    otherKey: 'postId',
  });
};

const BlogPost = (model, through) => {
  model.BlogPost.belongsToMany(model.Category, {
    as: 'category',
    through,
    foreignKey: 'postId',
    otherKey: 'categoryId',
  });
};

module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER },
    }, { timestamps: false });

  PostsCategories.associate = (models) => {
    Category(models, PostsCategories);
    BlogPost(models, PostsCategories);
  };

  return PostsCategories;
};