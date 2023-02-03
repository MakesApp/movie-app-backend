import logger from '../../services/logger/index.js';
import Movie from './movie.models.js';

export const addMovie = async (req, res) => {
	console.log(req.body);
	try {
		const movie = await Movie.create(req.body);
		logger.debug(`Movie added successfully: ${JSON.stringify(movie)}`);
		res.status(200).send(movie);
	} catch (err) {
		logger.error(err.message);

		res.status(400).send({ error: err.message });
	}
};

export const getLatestMovies = async (req, res) => {
	try {
		const movies = await Movie.find().sort({ releaseDate: 'desc' }).limit(4);
		res.send(movies);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};
