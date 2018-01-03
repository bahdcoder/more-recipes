const normalizeRecipes = recipes => recipes.map(recipe => ({
  ...recipe,
  ingredients: JSON.parse(recipe.ingredients),
  procedure: JSON.parse(recipe.procedure),
  User: {
    ...recipe.User,
    settings: JSON.parse(recipe.User.settings)
  }
}));

export default normalizeRecipes;
