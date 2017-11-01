import { Router } from 'express';
import middleware from '../middleware';
//  import RecipesController from './../controllers/auth.controller';
import ReviewsController from './../controllers/reviews.controller';

const recipesRoutes = new Router();
const reviewsController = new ReviewsController();

recipesRoutes.post('/:id/review', middleware.auth, middleware.canReview, reviewsController.create);

export default recipesRoutes;
