import { Router } from 'express';

import { moviesController } from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/latest', moviesController.getLatestMovies);
movieRouter.get('/getTopMovies', moviesController.getTopMovies);
movieRouter.get('/:id', moviesController.getDetailedMovie);
movieRouter.get('/search/movie', moviesController.searchMovie);
movieRouter.get('/advancesearch/movie', moviesController.advanceSearch);
movieRouter.post(
	'/:movieId/user/:userId/rate',
	moviesController.addMovieRating
);

export default movieRouter;
