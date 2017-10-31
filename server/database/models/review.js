module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    review: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        Review.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        Review.belongsTo(models.Recipe, {
          foreignKey: 'recipeId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Review;
};
