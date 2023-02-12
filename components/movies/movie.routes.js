import { Router } from 'express';

import {
	getDetailedMovie,
	getLatestMovies,
	getTopMovies,
	getRandomGreatMovies,
} from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/random', getRandomGreatMovies);
movieRouter.get('/latest', getLatestMovies);
movieRouter.get('/:id', getDetailedMovie);
movieRouter.get('/movies/getTopMovies', getTopMovies);

export default movieRouter;
