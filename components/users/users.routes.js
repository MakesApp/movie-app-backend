import { Router } from 'express';
import isUserAuthenticated from '../../middleware/isUserAuthenticated.js';
import {
	getUserFavorites,
	addUserFavorite,
	removeUserFavorite,
	getWatchLater,
	addWatchLater,
	removeWatchLater,
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
userRouter.get('/:userId/movies/watchLater', getWatchLater);
userRouter.post('/:userId/movies/watchLater/add', addWatchLater);
userRouter.delete('/:userId/movies/watchLater/:movieId', removeWatchLater);

export default userRouter;
