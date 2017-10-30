module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    timeToCook: DataTypes.INTEGER,
    ingredients: DataTypes.ARRAY(DataTypes.STRING),
    procedure: DataTypes.ARRAY(DataTypes.STRING),
    upvoters: DataTypes.ARRAY(DataTypes.INTEGER),
    downvoters: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    classMethods: {
      associate(models) {
        Recipe.belongsTo(models.User);
      }
    }
  });
  return Recipe;
};
