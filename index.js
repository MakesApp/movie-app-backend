import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import logger from './services/logger/index.js';
import './services/DB/mongoose.js';
import './services/logger/index.js';
import dotenv from 'dotenv';
import movieRouter from './components/movies/movie.routes.js';
import { notFoundRoute } from './middleware/not-found-middleware.js';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware.js';
import cookieSession from 'cookie-session';
import Passport from 'passport';
import { authRoute } from './routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.options('*', cors());
app.use(
	cookieSession({
		name: 'session',
		keys: [process.env.COOKIES_KEYS],
		maxAge: 24 * 60 * 60 * 100,
	})
);
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: 'GET,POST,PUT,DELETE',
		credentials: true,
	})
);
app.use(Passport.initialize());
app.use(Passport.session());
app.use('/api', authRoute);

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

const PORT = process.env.PORT || 5000;
app.use('/api/movies', movieRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundRoute);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
