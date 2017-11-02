import { Router } from 'express';
import middleware from '../middleware';
import controllers from './../controllers';

const userRoutes = new Router();
const authController = new controllers.AuthController();
const usersController = new controllers.UsersController();

userRoutes.get('/recipes', middleware.auth, usersController.getFavorites);
userRoutes.post('/signin', middleware.signinUserValidator, authController.signin);
userRoutes.post('/signup', middleware.registerUserValidator, authController.signup);
userRoutes.post('/:recipeId/favorite', middleware.auth, middleware.canFavorite, usersController.favorite);

export default userRoutes;
