import { Router } from 'express';

import { getDetailedMovie, getLatestMovies } from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/latest', getLatestMovies);
movieRouter.get('/:id', getDetailedMovie);

export default movieRouter;
