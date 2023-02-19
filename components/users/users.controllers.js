import { User } from './users.models.js';
import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { asyncWrapper } from '../../middleware/asyncWrapper.js';
export const usersController = {
	createUser: asyncWrapper(async (req, res) => {
		const user = new User({
			username: req.body.username,
			password: hashSync(req.body.password, 10),
		});
		const savedUser = await user.create();
		return res.send(savedUser);
	}),
	login: asyncWrapper(async (req, res) => {
		const user = await User.findOne({ username: req.body.username });
		if (!compareSync(req.body.password, user.password)) {
			return res.status(401).send({
				success: false,
				message: 'Incorrect password',
			});
		}
		const payload = {
			username: user.username,
			id: user._id,
		};
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});
		payload.token = token;
		return res.status(200).send(payload);
	}),
	logout: (req, res, next) => {
		req.logout(function (err) {
			if (err) {
				return next(err);
			}
		});
		res.send('logging out');
	},
	addUserFavorite: asyncWrapper(async (req, res) => {
		const userId = req.params.userId;
		const movieId = req.body;
		const user = await User.findById(userId);
		if (!user) return res.status(404).send('User not found');
		user.favorites.push(movieId);
		const result = await user.save();
		res.send(result);
	}),
	getUserFavorites: asyncWrapper(async (req, res) => {
		const { userId } = req.params;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send('User not found');
		}
		return res.send(user.favorites);
	}),
	removeUserFavorite: asyncWrapper(async (req, res) => {
		const userId = req.params.userId;
		const movieId = req.params.movieId;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send('User not found');
		}
		const foundMovie = user.favorites.find((movie) => movie.id === movieId);
		if (!foundMovie) return res.status(404).send({ error: 'Movie not found' });
		user.favorites = user.favorites.filter((movie) => movie.id !== movieId);
		await user.save();
		res.send(user);
	}),
};
