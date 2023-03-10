import express from 'express';
import movieRouter from '../components/movies/movie.routes.js';
import userRouter from '../components/users/users.routes.js';
import authRouter from '../components/auth/auth.routes.js';

const router = express.Router();

router.use(authRouter);
router.use('/user', userRouter);
router.use('/movies', movieRouter);

export default router;
