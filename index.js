import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import router from './components/movies/movie.routes.js';
import { userRouter } from './components/users/users.routes.js';
import './services/DB/mongoose.js';
import './services/logger/index.js';

const app = express();
app.use(express.json());

app.use(
	session({
		secret: 'outlittlesecret',
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
app.use('/user', userRouter);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
