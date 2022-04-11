module.exports = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {
    postId: { type: DataTypes.INTEGER, field: 'post_id' },
    }, { timestamps: false });

  PostCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: PostCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'category',
      through: PostCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategories;
};