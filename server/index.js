import Express from 'express';
import RecipesController from './controllers/recipes.controller';

const app = new Express();

const recipesController = new RecipesController();
app.use('/api/recipes', recipesController.router);

app.listen(4044);
