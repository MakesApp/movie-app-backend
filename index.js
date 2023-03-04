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
import { Strategy as LocalStrategy } from 'passport-local';
import cookieSession from 'cookie-session';
import bcrypt from 'bcrypt';
import './services/auth/passportGoogleSSO.js';
// import './services/auth/passport';

import session from 'express-session';
import User from './components/users/users.models.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(
	session({
		secret: 'secretcode',
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
passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
			if (err) throw err;
			if (!user) return done(null, false);
			bcrypt.compare(password, user.password, (err, result) => {
				if (err) throw err;
				if (result === true) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		});
	})
);

passport.serializeUser((user, cb) => {
	cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
	User.findOne({ _id: id }, (err, user) => {
		cb(err, user);
	});
});

// Routes
app.post('/register', async (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send('User Already Exists');
		if (!doc) {
			const hashedPassword = await bcrypt.hash(password, 10);
			const newUser = new User({
				username,
				password: hashedPassword,
			});
			await newUser.save();
			res.send('success');
		}
	});
});
app.post('/login', passport.authenticate('local'), (req, res) => {
	res.send('success');
});

app.use('/api', api);

app.use(errorHandlerMiddleware);
app.use(notFoundRoute);

const PORT = process.env.PORT || 5000;

app.listen(8080, () => {
	console.log(`Server started on port ${PORT}`);
});
