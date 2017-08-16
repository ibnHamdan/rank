module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      required: true
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
    }},
    password: {
      type: DataTypes.STRING,
      required: true
    },
    photo: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'disabled']
    },
    created_at: DataTypes.DATE,
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }
  );
  return User;
};