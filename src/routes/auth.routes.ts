import { Router } from 'express';
import UserController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register', UserController.register);
authRouter.post('/login', UserController.login);
authRouter.post('/forgot-password', UserController.forgotPassword);
authRouter.get('/confirm-email/:token', UserController.confirmEmail);
authRouter.post('/new-password', UserController.newPassword);

export default authRouter;
