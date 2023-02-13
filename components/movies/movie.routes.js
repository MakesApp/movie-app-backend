import { Router } from 'express';
import { asyncWrapper } from '../../middleware/asyncWrapper.js';

import { moviesController } from './movie.controllers.js';
import { Movie } from './movie.model.js';

const movieRouter = Router();

movieRouter.get('/latest', moviesController.getLatestMovies);
movieRouter.get('/:id', moviesController.getDetailedMovie);
movieRouter.post(
	'/',
	// eslint-disable-next-line no-unused-vars
	asyncWrapper(async (req, res, next) => {
		const movie = await Movie.create(req.body);
		console.log(movie);
		res.status(200).send(movie);
	})
);
export default movieRouter;
