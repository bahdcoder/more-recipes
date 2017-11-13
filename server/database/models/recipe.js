import redisClient from '../../helpers/redis-client';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    timeToCook: DataTypes.INTEGER,
    ingredients: DataTypes.TEXT,
    procedure: DataTypes.TEXT
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId'
    });
  };

  Recipe.addHook('afterFind', async (results) => {
    if (Array.isArray(results)) {
      await Promise.all(results.map(async (sequelizeRecipe) => {
        const recipe = sequelizeRecipe.get();
        recipe.upvotes = (await redisClient.smembers(`recipe:${recipe.id}:upvotes`)).length;
        recipe.downvotes = (await redisClient.smembers(`recipe:${recipe.id}:downvotes`)).length;
        recipe.favorites = (await redisClient.smembers(`recipe:${recipe.id}:favorites`)).length;
        return recipe;
      }));
    } else {
      const recipe = results.get();
      recipe.upvotes = (await redisClient.smembers(`recipe:${recipe.id}:upvotes`)).length;
      recipe.downvotes = (await redisClient.smembers(`recipe:${recipe.id}:downvotes`)).length;
      recipe.favorites = (await redisClient.smembers(`recipe:${recipe.id}:favorites`)).length;
      return recipe;
    }
  });

  return Recipe;
};
