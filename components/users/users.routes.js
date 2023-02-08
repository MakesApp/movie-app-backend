import { Router } from 'express';
import { createUser, login, logout } from './users.controllers.js';

export const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
