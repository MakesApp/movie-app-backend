import { Router } from 'express';
// import Passport from 'passport';
import { usersController } from './users.controllers.js';

export const userRouter = Router();

userRouter.post('/register', usersController.createUser);
userRouter.post(
	'/login',
	// Passport.authenticate('jwt', { session: false }),
	usersController.login
);
userRouter.get('/logout', usersController.logout);
userRouter.get('/:userId/movies/favorites', usersController.getUserFavorites);
userRouter.post(
	'/:userId/movies/favorites/add',
	usersController.addUserFavorite
);
userRouter.delete(
	'/:userId/movies/:movieId/favorites',
	usersController.removeUserFavorite
);
