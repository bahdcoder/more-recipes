module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
    recipeId: DataTypes.UUID,
    userId: DataTypes.UUID
  }, {
    classMethods: {
      associate(models) {
        Downvote.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
        Downvote.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Downvote;
};
