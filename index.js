import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { userRouter } from './components/users/users.routes.js';
import './services/DB/mongoose.js';
import './services/logger/index.js';
import morgan from 'morgan';
import logger from './services/logger/index.js';
import dotenv from 'dotenv';
import { movieRouter } from './components/movies/movie.routes.js';
import { notFoundRoute } from './middleware/not-found-middleware.js';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware.js';
import { authRouter } from './components/auth/auth.router.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(
	session({
		secret: process.env.JWT_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use('api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/auth', authRouter);
app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get(
	'/auth/google/movie-app',
	passport.authenticate('google', {
		successRedirect: '/homepage',
		failureRedirect: '/login',
	})
);

app.use(morgan('dev'));
app.options('*', cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, HEAD'
	);
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	logger.info(`${req.method} ${req.originalUrl}`);
	next();
});

app.use(errorHandlerMiddleware);
app.use(notFoundRoute);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
