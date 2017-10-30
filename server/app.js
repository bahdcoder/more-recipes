import express from 'express';
import bodyParser from 'body-parser';

import db from './database/models';
import middleware from './middleware';
import userRoutes from './routes/users';
import controllers from './controllers';


const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.Api);

app.post('/api/v1/recipes', middleware.createRecipeValidator);
app.put('/api/v1/recipes/:id', middleware.createRecipeValidator);
app.post('/api/v1/users/signup', middleware.registerUserValidator);
app.post('/api/v1/users/signin', middleware.signinUserValidator);

app.use('/api/v1', (new controllers.ReviewsController()).router);
app.use('/api/v1/recipes', (new controllers.RecipesController()).router);
app.use('/api/v1/users', userRoutes);

db.sequelize.sync().then(() => {
  app.listen(7044, () => {
      console.log('The database is in sync now. start making requests !');
  });
});

export default app;
