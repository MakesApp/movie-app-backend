// import logger from '../../services/logger/index.js';
// import Movie from './movie.models.js';
import axios from 'axios';
import dotenv from 'dotenv';
// import { customSort } from '../../utils/helper.js';

dotenv.config();

// export const addMovie = async (req, res) => {
// 	// console.log(req.body);
// 	try {
// 		const movie = await Movie.create(req.body);
// 		logger.debug(`Movie added successfully: ${JSON.stringify(movie)}`);
// 		res.status(200).send(movie);
// 	} catch (err) {
// 		logger.error(err.message);

// 		res.status(400).send({ error: err.message });
// 	}
// };

// export const getAllMovies = async (req, res) => {
// 	try {
// 		const movies = await Movie.find({});
// 		res.status(200).send({ movies });
// 	} catch (error) {
// 		res.status(500).send({ error: error.message });
// 	}
// };

// export const getMovieById = async (req, res) => {
// 	try {
// 		const movieId = req.params.id;
// 		const movie = await Movie.findById(movieId);
// 		if (!movie) {
// 			throw Error('Movie not found');
// 		}
// 		res.status(200).send({ movie });
// 	} catch (error) {
// 		res.status(500).send({ error: error.message });
// 	}
// };

// export const deleteMovie = async (req, res) => {
// 	try {
// 		const movieId = req.params.id;
// 		const deletedMovie = await Movie.findByIdAndDelete(movieId);
// 		if (!deletedMovie) {
// 			throw Error('Movie not found');
// 		}
// 		res.status(200).send({ message: 'Movie deleted successfully' });
// 	} catch (error) {
// 		res.status(500).send({ error: error.message });
// 	}
// };

// export const updateMovie = async (req, res) => {
// 	try {
// 		const movieId = req.params.id;
// 		const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
// 			new: true,
// 		});
// 		if (!updatedMovie) {
// 			res.status(404).send({ error: 'Movie not found' });
// 		}
// 		res.status(200).send({ movie: updatedMovie });
// 	} catch (error) {
// 		res.status(500).send({ error: error.message });
// 	}
// };

export const getLatestMovies = async (req, res) => {
	const defaultPoster =
		'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60';
	const { limit = 10 } = req.query;
	try {
		const tmdbResponse = await axios.get(
			`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page?limit=${limit}`
		);
		const tmdbData = tmdbResponse.data;
		const tmdbMovies = tmdbData.results.map((movie) => ({
			name: movie.title,
			rating: movie.vote_average,
			poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
			year: movie.release_date.substring(0, 4),
			id: movie.id,
		}));

		const omdbResponse = await axios.get(
			`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&type=movie&y=2023&r=json&s=movie`
		);
		const omdbData = omdbResponse.data;
		const omdbMovies = omdbData.Search.map((movie) => ({
			name: movie.Title,
			rating: movie.imdbRating,
			poster: movie.Poster === 'N/A' ? defaultPoster : movie.Poster,
			year: movie.Year,
			id: movie.imdbID,
		}));

		const latestMovies = [...omdbMovies, ...tmdbMovies].slice(0, limit);
		res.status(200).send(latestMovies);

		// const { data } = await axios.get(
		// 	`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page?limit=1`
		// );
		// const { data } = await axios.get(
		// 	`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&type=movie&y=2023&r=json&s=movie`
		// );
		// console.log(data);
		// const movies = data.results.sort(customSort).slice(0, 9);

		// res.send(movies);
	} catch (err) {
		res.status(400).send({ error: err.message });
	}
};

// export const getDetailedMovie = async (req, res) => {
// 	try {
// 		const { id } = req.body;

// 		const tmdbResponse = await axios.get(
// 			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
// 		);
// 		const tmdbData = tmdbResponse.data;
// 		console.log(tmdbData);

// 		const omdbResponse = await axios.get(
// 			`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${omdbData.imdbID}`
// 		);
// 		const omdbData = omdbResponse.data;
// 		console.log(omdbData);

// 	} catch (error) {
// 		res.status(404).send({ error: error.message });
// 	}
// };
