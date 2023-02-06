import { Router } from 'express';
import {
	getUserFavorites,
	addUserFavorite,
	removeUserFavorite,
} from './users.controllers.js';

export const userRoutes = Router();

userRoutes.get('/user/:userId/movies/favorites', getUserFavorites);
userRoutes.post('/user/:userId/movies/favorites/add', addUserFavorite);
userRoutes.delete(
	'/user/:userId/movies/:movieId/favorites',
	removeUserFavorite
);
