module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
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
        Recipe.belongsTo(models.User, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Recipe;
};
