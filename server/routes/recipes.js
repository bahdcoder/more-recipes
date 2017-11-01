import { Router } from 'express';
import middleware from '../middleware';
import RecipesController from './../controllers/recipes.controller';
import ReviewsController from './../controllers/reviews.controller';

const recipesRoutes = new Router();
const reviewsController = new ReviewsController();
const recipesController = new RecipesController();

recipesRoutes.get('/', recipesController.index);
recipesRoutes.post('/', middleware.auth, middleware.createRecipeValidator, recipesController.create);
recipesRoutes.put('/:id', middleware.auth, middleware.authorize, middleware.createRecipeValidator, recipesController.update);
recipesRoutes.delete('/:id', middleware.auth, middleware.authorize, recipesController.destroy);

recipesRoutes.get('/favorites', middleware.auth, recipesController.getFavorites);
recipesRoutes.post('/:id/upvote', middleware.auth, middleware.canUpvote, recipesController.upvote);
recipesRoutes.post('/:id/downvote', middleware.auth, middleware.canDownvote, recipesController.downvote);
recipesRoutes.post('/:id/favorite', middleware.auth, middleware.canFavorite, recipesController.favorite);
recipesRoutes.post('/:id/review', middleware.auth, middleware.canReview, reviewsController.create);

export default recipesRoutes;
