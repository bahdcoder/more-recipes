import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';
import db from './database/models';
import middleware from './middleware';


const app = new express();

const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => res.render('index'));

app.use(middleware.api);

app.use('/api/v1/users', routes.userRoutes);
app.use('/api/v1/recipes', routes.recipesRoutes);

//  app.use((req, res) => res.render('index'));

db.sequelize.sync().then(() => {
  app.listen(port, () => {
      console.log(process.env.NODE_ENV);
  });
}).catch(error => console.log(error.message));

export default app;
