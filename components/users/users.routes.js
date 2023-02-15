import { Router } from 'express';
import { usersController } from './users.controllers.js';

export const userRouter = Router();

userRouter.post('/register', usersController.createUser);
userRouter.post('/login', usersController.login);
userRouter.get('/logout', usersController.logout);
