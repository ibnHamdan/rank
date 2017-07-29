module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      required: true,
    },
    photo: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      required: true
    }
  }, {
    underscored: true
  });
  return Post;
};