import { Router } from 'express';
import AuthController from './../controllers/auth.controller';

const authRouter = new Router();
const authController = new AuthController();

authRouter.post('/signup', authController.signup);
authRouter.post('/signin', authController.signin);

export default authRouter;
