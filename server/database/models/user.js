module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Recipe, {
          foreignKey: 'userId',
          as: 'Recipes'
        });
      }
    }
  });
  return User;
};
