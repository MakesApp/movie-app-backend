import { Router } from 'express';

import { moviesController } from './movie.controllers.js';

const movieRouter = Router();

movieRouter.get('/latest', moviesController.getLatestMovies);
movieRouter.get('/getTopMovies', moviesController.getTopMovies);
movieRouter.get('/:id', moviesController.getDetailedMovie);
movieRouter.get('/search/movie', moviesController.searchMovie);

export default movieRouter;
