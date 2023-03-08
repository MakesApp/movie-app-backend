import { Router } from 'express';
import isUserAuthenticated from '../../middleware/isUserAuthenticated.js';
import {
	getUserFavorites,
	addUserFavorite,
	removeUserFavorite,
	addUserReview,
	getMovieReviews,
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
userRouter.post(
	'/:userId/movies/:movieid/reviews/add',
	isUserAuthenticated,
	addUserReview
);
userRouter.get(
	'/:userId/movies/:movieid/reviews',
	isUserAuthenticated,
	getMovieReviews
);
userRouter.get('/:userId/movies/watchLater', getWatchLater);
userRouter.post('/:userId/movies/watchLater/add', addWatchLater);
userRouter.delete('/:userId/movies/watchLater/delete', removeWatchLater);

export default userRouter;
