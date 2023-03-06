import { asyncWrapper } from '../../middleware/asyncWrapper.js';
import User from './users.models.js';
export const addUserFavorite = async (req, res) => {
	try {
		const userId = req.params.userId;
		const movieId = req.body;

		const user = await User.findById(userId);
		if (!user) return res.status(404).send('User not found');

		user.favorites.push(movieId);
		const result = await user.save();

		res.send(result);
	} catch (err) {
		res.status(500).send(err);
	}
};

export const getUserFavorites = async (req, res) => {
	const { userId } = req.params;

	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).send('User not found');
		}

		return res.send(user.favorites);
	} catch (err) {
		res.status(500).send(err);
	}
};

export const removeUserFavorite = async (req, res) => {
	try {
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
	} catch (err) {
		res.status(500).send(err);
	}
};
export const getWatchLater = asyncWrapper(async (req, res) => {
	const { userId } = req.params;
	const user = await User.findById(userId);
	if (!user) {
		return res.status(404).send('User not found');
	}
	return res.send(user);
});
export const addWatchLater = asyncWrapper(async (req, res) => {
	const userId = req.params.userId;
	const movieId = req.body.movieId;
	const user = await User.findById(userId);

	if (!user) return res.status(404).send('User not found');
	user.watchLater.push(movieId);

	const result = await user.save();
	res.send(result);
});
export const removeWatchLater = asyncWrapper(async (req, res) => {
	const userId = req.params.userId;
	const movieId = req.params.movieId;
	const user = await User.findById(userId);

	if (!user) {
		return res.status(404).send('User not found');
	}
	const foundMovie = user.watchLater.find((movie) => movie.id === movieId);
	if (!foundMovie) return res.status(404).send({ error: 'Movie not found' });
	user.watchLater = user.watchLater.filter((movie) => movie.id !== movieId);

	await user.save();
	res.send(user);
});
