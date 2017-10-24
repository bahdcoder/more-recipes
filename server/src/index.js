import Express from 'express';
import RecipesController from './controllers/recipe.controller';

const app = new Express();

const recipesController = new RecipesController();
app.use('/recipes', recipesController.router);

app.listen(4000);
