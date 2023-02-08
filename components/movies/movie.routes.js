import { Router } from 'express';

import {
	getDetailedMovie,
	getLatestMovies,
	getTopMovies,
} from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/latest', getLatestMovies);
movieRouter.get('/:id', getDetailedMovie);
movieRouter.get('/movies/getTopMovies', getTopMovies);

export default movieRouter;
