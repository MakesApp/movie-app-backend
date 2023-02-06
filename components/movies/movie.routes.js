import { Router } from 'express';

import {
	// getDetailedMovie,
	// addMovie,
	// deleteMovie,
	// getMovieById,
	// getAllMovies,
	// updateMovie,
	getLatestMovies,
} from './movie.controllers.js';

const router = Router();

router.get('/movies/latest', getLatestMovies);
// router.get('/movies/:id', getDetailedMovie)
// router.get('/movies', getAllMovies);
// router.get('/movies/:id', getMovieById);
// router.post('/movies/add', addMovie);
// router.delete('/movies/:id', deleteMovie);
// router.patch('/movies/:id', updateMovie);

export default router;
