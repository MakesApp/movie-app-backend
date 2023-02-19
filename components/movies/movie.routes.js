import { Router } from 'express';

import { moviesController } from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/latest', moviesController.getLatestMovies);
movieRouter.get('/:id', moviesController.getDetailedMovie);

export default movieRouter;
