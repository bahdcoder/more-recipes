import Express from 'express';
import Controllers from './controllers';

const app = new Express();

const recipesController = new Controllers.RecipesController();
app.use('/api/recipes', recipesController.router);
app.listen(4044);

