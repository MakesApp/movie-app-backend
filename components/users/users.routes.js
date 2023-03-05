import { Router } from 'express';
import isUserAuthenticated from '../../middleware/isUserAuthenticated.js';
import {
	getUserFavorites,
	addUserFavorite,
	removeUserFavorite,
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

export default userRouter;
