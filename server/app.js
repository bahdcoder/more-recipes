import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';
import db from './database/models';
import middleware from './middleware';


const app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(middleware.api);

app.use('/api/v1/users', routes.userRoutes);
app.use('/api/v1/recipes', routes.recipesRoutes);

db.sequelize.sync().then(() => {
  app.listen(7044, () => {
      console.log('The database is in sync now. start making requests !');
  });
});

export default app;
