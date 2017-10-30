module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    UserId: DataTypes.UUID
  }, {
    classMethods: {
      associate(models) {
        Favorite.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
        Favorite.belongsTo(models.Recipe, {
          foreignKey: 'RecipeId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Favorite;
};
