const User = (model, through) => {
  model.BlogPost.belongsTo(model.User, {
    as: 'users',
    through,
    foreignKey: 'id',
    otherKey: 'id',
  });
};

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    User(models, BlogPost);
  };

  return BlogPost;
};