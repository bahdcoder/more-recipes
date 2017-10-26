import Express from 'express';
import BodyParser from 'body-parser';
import Middleware from './middleware';
import Controllers from './controllers';


const app = new Express();
app.use(Middleware.Api);
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.use('/api/v1/recipes', (new Controllers.RecipesController()).router);
app.use('/api/v1', (new Controllers.ReviewsController()).router);
app.listen(4044);

export default app;
