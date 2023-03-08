import User from './users.models.js';
import Movie from '../movies/movie.model.js';
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
export const addUserReview = async (req, res) => {
	const userId = req.params.userId;
	const movieid = req.params.movieid;
	const { rating, content } = req.body;
	const user = await User.findById(userId);
	if (!user) return res.status(404).send('User not found');
	const selectedMovie = await Movie.findById(movieid);
	const selectedUser = await User.findById(userId);
	const updatedMovie = await Movie.findByIdAndUpdate(movieid, {
		reviews: [...selectedMovie.reviews, { rating, content }],
	});
	await User.findByIdAndUpdate(userId, {
		commits: [...selectedUser.commits, { rating, content }],
	});
	res.json(updatedMovie).status(200);
};

export const getUserReviews = async (req, res) => {
	const { userId } = req.params;
	const selectedUser = await User.findById(userId);
	res.json(selectedUser.commits).status(200);
};

export const getMovieReviews = async (req, res) => {
	const { movieId } = req.body;
	const movieReviews = await Movie.findById(movieId);
	res.json(movieReviews).status(200);
};

//edit commit func
// export const updateMoviereviews=async(req,res)=>{
// 		const updatedreview=await Movie.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
// }
