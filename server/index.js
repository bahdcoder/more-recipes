import Express from 'express';
import BodyParser from 'body-parser';
import Middleware from './middleware';
import Controllers from './controllers';


const app = new Express();
app.use(Middleware.Api);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
const recipesController = new Controllers.RecipesController();
app.use('/api/recipes', recipesController.router);
app.listen(4044);

export default app;
