import { Router } from 'express';

import {
	getDetailedMovie,
	getLatestMovies,
	getRandomGreatMovies,
} from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/random', getRandomGreatMovies);
movieRouter.get('/latest', getLatestMovies);
movieRouter.get('/:id', getDetailedMovie);

export default movieRouter;
