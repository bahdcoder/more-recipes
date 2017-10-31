import { Router } from 'express';
import middleware from '../middleware';
import AuthController from './../controllers/auth.controller';

const authRouter = new Router();
const authController = new AuthController();

authRouter.post('/signup', middleware.registerUserValidator, authController.signup);
authRouter.post('/signin', middleware.signinUserValidator, authController.signin);

export default authRouter;
