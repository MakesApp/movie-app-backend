import { Router } from 'express';

import { moviesController } from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/:id', moviesController.getDetailedMovie);
movieRouter.get('/latest', moviesController.getLatestMovies);
movieRouter.get('/searchMovie', moviesController.searchMovie);

export default movieRouter;
