import { Router } from 'express';
import { moviesController } from './movie.controller.js';

export const movieRouter = Router();

movieRouter.get('/latest', moviesController.getLatestMovies);
movieRouter.get('/:id', moviesController.getDetailedMovie);
