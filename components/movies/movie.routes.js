import { Router } from 'express';

import {
	addMovie,
	deleteMovies,
	getLatestMovies,
	getMovieById,
	getMovies,
	updateMovies,
	getTopMovies,
} from './movie.controllers.js';

const router = Router();

router.get('/movies', getMovies);
router.get('/movie/:id', getMovieById);
router.post('/movies/add', addMovie);
router.delete('/movies/delete/:id', deleteMovies);
router.patch('/movies/update/:id', updateMovies);
router.get('/movies/latest', getLatestMovies);
router.get('/movies/getTopMovies', getTopMovies);

export default router;
