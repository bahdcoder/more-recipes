import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';
import db from './database/models';
import middleware from './middleware';

//  Configure environment variables

const app = new express();


//  Enable CORS for the express server
app.use(cors());
app.options('*', cors());

// Enable HTTP REQUEST logging
app.use(morgan('combined'));

const port = process.env.PORT || 4444;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  app.set('view engine', 'ejs');
//  app.set('views', path.join(__dirname, '/views'));
//  app.set('appPath', 'public');
app.use(express.static(path.join(__dirname, '/public')));
//  app.get('/', (req, res) => res.render('index'));

app.use(middleware.api);

app.use('/api/v1/users', routes.userRoutes);
app.use('/api/v1/recipes', routes.recipesRoutes);
app.use('/api/v1/frontend', routes.frontendRouter);
//  app.use((req, res) => res.render('index'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    //  console.log(process.env.NODE_ENV);
  });
});

export default app;
