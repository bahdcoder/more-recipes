module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    timeToCook: DataTypes.INTEGER,
    ingredients: DataTypes.TEXT,
    procedure: DataTypes.TEXT
  }, {
    classMethods: {
      associate(models) {
        Recipe.belongsTo(models.User);
      }
    }
  });
  return Recipe;
};
