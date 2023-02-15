import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import router from './components/movies/movie.routes.js';
import { userRouter } from './components/users/users.routes.js';
import './services/DB/mongoose.js';
import './services/logger/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('pages/index');
});
app.get('/homepage', function (req, res) {
	res.render('pages/homepage');
});
app.get('/login', function (req, res) {
	res.render('pages/login');
});
app.use(
	session({
		secret: process.env.JWT_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
	if (!req.session) {
		return next(new Error('Error ... ')); //handle error
	}
	next(); //otherwise continue
});

app.use(cors());
const PORT = process.env.PORT || 5000;

app.use('/api', router);
app.use('/users', userRouter);
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

app.get(
	'/protected',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		return res.status(200).send({
			success: true,
			user: {
				id: req.user._id,
				username: req.user.username,
			},
		});
	}
);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
