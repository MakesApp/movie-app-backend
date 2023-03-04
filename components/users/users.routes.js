import { Router } from 'express';
import passport from 'passport';
import isUserAuthenticated from '../../middleware/isUserAuthenticated.js';
import {
	getUserFavorites,
	addUserFavorite,
	removeUserFavorite,
	register,
} from './users.controllers.js';

const userRouter = Router();

userRouter.get(
	'/:userId/movies/favorites',
	isUserAuthenticated,
	getUserFavorites
);
userRouter.post(
	'/:userId/movies/favorites/add',
	isUserAuthenticated,
	addUserFavorite
);
userRouter.delete(
	'/:userId/movies/:movieId/favorites',
	isUserAuthenticated,
	removeUserFavorite
);
userRouter.post('/register', register);
userRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: process.env.CLIENT_URL,
		failureMessage: 'ha',
	})
);
export default userRouter;
