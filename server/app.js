import express from 'express';
import bodyParser from 'body-parser';
import middleware from './middleware';
import controllers from './controllers';


const app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.Api);
app.post('/api/v1/recipes', middleware.createRecipeValidator);
app.put('/api/v1/recipes/:id', middleware.createRecipeValidator);
app.use('/api/v1', (new controllers.ReviewsController()).router);
app.use('/api/v1/recipes', (new controllers.RecipesController()).router);
app.listen(4044);

export default app;
