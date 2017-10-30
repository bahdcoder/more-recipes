module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Recipe, {
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return User;
};
