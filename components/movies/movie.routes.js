import { Router } from 'express';
import express from 'express';

import {
	addMovie,
	deleteMovie,
	getLatestMovies,
	getMovieById,
	getAllMovies,
	updateMovie,
} from './movie.controllers.js';

const router = Router();
const app = express();

app.use('/api', router);

app.use(express.json());

router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.post('/movies/add', addMovie);
router.delete('/movies/:id', deleteMovie);
router.patch('/movies/:id', updateMovie);
router.get('/movies/latest', getLatestMovies);

export default router;
