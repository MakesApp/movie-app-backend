import Movie from './movie.models.js';

export const addMovie = async (req, res) => {
	try {
		const movie = await Movie.create(req.body);
		res.status(200).send(movie);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

export const getLatestMovies = async (req, res) => {
	try {
		const movies = await Movie.find().sort({ releaseDate: 'desc' }).limit(2);
		res.send(movies);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};
