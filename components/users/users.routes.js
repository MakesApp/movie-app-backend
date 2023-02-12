import { Router } from 'express';
import {
	createUser,
	// googleAuth,
	login,
	logout,
	// resFromGoogle,
} from './users.controllers.js';

export const userRouter = Router();

userRouter.post('/register', createUser);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
// userRouter.get('/auth/google', googleAuth);
// userRouter.get('/auth/google/movie-app', resFromGoogle);
