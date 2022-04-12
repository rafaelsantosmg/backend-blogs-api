module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {
    postId: { type: DataTypes.INTEGER },
    }, { timestamps: false });

  PostsCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'category',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategories;
};