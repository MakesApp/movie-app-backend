import logger from '../../services/logger/index.js';
import Movie from './movie.models.js';

export const addMovie = async (req, res) => {
	// console.log(req.body);
	try {
		const movie = await Movie.create(req.body);
		logger.debug(`Movie added successfully: ${JSON.stringify(movie)}`);
		res.status(200).send(movie);
	} catch (err) {
		logger.error(err.message);

		res.status(400).send({ error: err.message });
	}
};

export const getAllMovies = async (req, res) => {
	try {
		const movies = await Movie.find({});
		res.status(200).send({ movies });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

export const getMovieById = async (req, res) => {
	try {
		const movieId = req.params.id;
		const movie = await Movie.findById(movieId);
		if (!movie) {
			res.status(404).send({ error: 'Movie not found' });
		}
		res.status(200).send({ movie });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

export const deleteMovie = async (req, res) => {
	try {
		const movieId = req.params.id;
		const deletedMovie = await Movie.findByIdAndDelete(movieId);
		if (!deletedMovie) {
			res.status(400).send({ error: 'Movie not found' });
		}
		res.status(200).send({ message: 'Movie deleted successfully' });
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

export const updateMovie = async (req, res) => {
	try {
		const movieId = req.params.id;
		const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
			new: true,
		});
		if (!updatedMovie) {
			res.status(404).send({ error: 'Movie not found' });
		}
		res.status(200).send({ movie: updatedMovie });
	} catch (error) {
		res.status(500).send({ error: error.message });
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
