import Movie from './movie.models.js';
import axios from 'axios';

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

export const getTopMovies = async (req, res) => {
	try {
		const page = req.query.page || 1;

		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=ec4fb4a5ae54f130ae25add30ef5a3f9&language=en-US&page=${page}`
		);
		const data = response.data;

		const topMovies = data.results.map((movie) => ({
			name: movie.title,
			rating: movie.vote_average,
			poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			year: movie.release_date.slice(0, 4),
			id: movie.id,
		}));

		res.send(topMovies);
	} catch (err) {
		res.status(500).send(err);
	}
};
