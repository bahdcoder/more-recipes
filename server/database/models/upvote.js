module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    recipeId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    classMethods: {
      associate(models) {
        Upvote.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
        Upvote.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Upvote;
};
