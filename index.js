import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import logger from './services/logger/index.js';
import './services/DB/mongoose.js';
import './services/logger/index.js';
import dotenv from 'dotenv';
import { notFoundRoute } from './middleware/not-found-middleware.js';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware.js';
import passport from 'passport';
import './services/auth/google-auth.js';
import session from 'express-session';
import authRouter from './components/auth/auth.route.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(
	session({
		secret: process.env.SECRET_SESSION,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.options('*', cors());
app.use(cors());

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

app.use('/auth', authRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
