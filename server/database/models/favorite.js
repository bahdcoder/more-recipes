module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: DataTypes.UUID,
    recipeId: DataTypes.UUID
  }, {
    classMethods: {
      associate(models) {
        Favorite.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Favorite.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Favorite;
};
