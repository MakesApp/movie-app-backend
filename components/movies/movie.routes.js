import { Router } from 'express';

import {
	getDetailedMovie,
	getLatestMovies,
	getTopMovies,
	searchMovie,
} from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/latest', getLatestMovies);
movieRouter.get('/:id', getDetailedMovie);
movieRouter.get('/movies/getTopMovies', getTopMovies);
movieRouter.get('/searchMovie', searchMovie);

export default movieRouter;
