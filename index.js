import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import logger from './services/logger/index.js';
import './services/DB/mongoose.js';
import './services/logger/index.js';
import dotenv from 'dotenv';
import { notFoundRoute } from './middleware/not-found-middleware.js';
import { errorHandlerMiddleware } from './middleware/error-handler-middleware.js';
import api from './api/index.js';
import passport from 'passport';
import './services/auth/passportGoogleSSO.js';
import './services/auth/passport.js';
import session from 'express-session';
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(
	session({
		secret: process.env.SECRET_SESSION,
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Credentials', 'true');
// 	res.header(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PUT, DELETE, PATCH, HEAD'
// 	);
// 	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	logger.info(`${req.method} ${req.originalUrl}`);
// 	next();
// });
// Passport

app.use('/api', api);

app.use(errorHandlerMiddleware);
app.use(notFoundRoute);

const PORT = process.env.PORT || 5000;

app.listen(8080, () => {
	console.log(`Server started on port ${PORT}`);
});
