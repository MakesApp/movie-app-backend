import { Router } from 'express';
import {
	getUserFavorites,
	addUserFavorite,
	removeUserFavorite,
	addWatchLater,
} from './users.controllers.js';

const userRoutes = Router();

userRoutes.get('/user/:userId/movies/favorites', getUserFavorites);
userRoutes.post('/user/:userId/movies/favorites/add', addUserFavorite);
userRoutes.delete(
	'/user/:userId/movies/:movieId/favorites',
	removeUserFavorite
);
userRoutes.get('/user/:userId/movies/watchLater', addWatchLater);

export default userRoutes;
