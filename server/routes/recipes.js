import { Router } from 'express';
import middleware from '../middleware';
import controllers from '../controllers';

const recipesRoutes = new Router();
const reviewsController = new controllers.ReviewsController();
const recipesController = new controllers.RecipesController();
const votesController = new controllers.VotesController();

recipesRoutes.get('/', recipesController.index);
recipesRoutes.post('/', middleware.auth, middleware.createRecipeValidator, recipesController.create);
recipesRoutes.put('/:id', middleware.auth, middleware.authorize, middleware.createRecipeValidator, recipesController.update);
recipesRoutes.delete('/:id', middleware.auth, middleware.authorize, recipesController.destroy);

recipesRoutes.get('/:id/reviews', middleware.auth, reviewsController.index);
recipesRoutes.get('/:id/voters', middleware.auth, votesController.getVoters);
recipesRoutes.post('/:id/upvote', middleware.auth, middleware.canUpvote, votesController.upvote);
recipesRoutes.post('/:id/downvote', middleware.auth, middleware.canDownvote, votesController.downvote);
recipesRoutes.post('/:id/review', middleware.auth, middleware.canReview, reviewsController.create);

export default recipesRoutes;
