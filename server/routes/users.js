import { Router } from 'express';
import middleware from '../middleware';
import AuthController from './../controllers/auth.controller';

const userRoutes = new Router();
const authController = new AuthController();

userRoutes.post('/signup', middleware.registerUserValidator, authController.signup);
userRoutes.post('/signin', middleware.signinUserValidator, authController.signin);

export default userRoutes;
