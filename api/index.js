import express from 'express';
import movieRouter from '../components/movies/movie.routes.js';
import userRouter from '../components/users/users.routes.js';
import googleAuthRouter from '../components/auth/auth.routes.js';

const router = express.Router();

router.use(googleAuthRouter);
router.use('/user', userRouter);
router.use('/movies', movieRouter);

export default router;
