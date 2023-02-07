import { Router } from 'express';

import { getDetailedMovie, getLatestMovies } from './movie.controllers.js';

const router = Router();

router.get('/latest', getLatestMovies);
router.get('/:id', getDetailedMovie);

export default router;
