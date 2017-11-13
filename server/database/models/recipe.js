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
    /**
     * Updates the recipe attributes
     *
     * @param {any} sequelizeRecipe sequelize Recipe instance
     * @returns {Recipe} recipe with upvotes, downvotes and favorites attributes
     */
    async function updateRecipeAttributes(sequelizeRecipe) {
      const recipe = sequelizeRecipe.get();

      const upvotersIds = await redisClient.smembers(`recipe:${recipe.id}:upvotes`);
      recipe.upvotersIds = upvotersIds;

      const downvotersIds = await redisClient.smembers(`recipe:${recipe.id}:downvotes`);
      recipe.downvotersIds = downvotersIds;

      const favoritersIds = await redisClient.smembers(`recipe:${recipe.id}:favorites`);
      recipe.favoritersIds = favoritersIds;

      return recipe;
    }
    if (Array.isArray(results)) {
      await Promise.all(results
        .map(async sequelizeRecipe => updateRecipeAttributes(sequelizeRecipe)));
    } else {
      return updateRecipeAttributes(results);
    }
  });

  return Recipe;
};
