import { Router } from 'express';

import {
	getDetailedMovie,
	getLatestMovies,
	getTopMovies,
	searchMovie,
	getRandomGreatMovies,
} from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/random', getRandomGreatMovies);
movieRouter.get('/latest', getLatestMovies);
movieRouter.get('/:id', getDetailedMovie);
movieRouter.get('/movies/getTopMovies', getTopMovies);
movieRouter.get('/searchMovie', searchMovie);

export default movieRouter;
