import axios from 'axios';
import { asyncWrapper } from '../../middleware/asyncWrapper.js';
import { filterByQuery, shuffleArray } from '../../utils/helper.js';
import {
	defaultActorPoster,
	TMDB_API_URL,
	TMDB_IMAGE_URL,
} from './movies.constants.js';
import Movie from './movie.model.js';

export const moviesController = {
	getLatestMovies: asyncWrapper(async (req, res) => {
		const { limit = 20 } = req.query;

		const tmdbResponse = await axios.get(
			`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}&language=en-US&page?limit=${limit}&sort_by=release_date.desc&primary_release_date.gte=2022-01-01&primary_release_date.lte=2023-01-01`
		);
		const tmdbData = tmdbResponse.data;
		const tmdbMovies = tmdbData.results.map((movie) => ({
			name: movie.title,
			rating: movie.vote_average.toFixed(1),
			poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
			year: new Date(movie.release_date).getFullYear(),
			id: movie.id,
		}));

		res.status(200).send(tmdbMovies);
	}),

	getDetailedMovie: asyncWrapper(async (req, res) => {
		const { id } = req.params;
		const tmdbResponse = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
		);
		const tmdbData = tmdbResponse.data;
		const omdbResponse = await axios.get(
			`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`
			// `http://www.omdbapi.com/?apikey=ad0870b9&i=tt14317038`
		);
		const omdbData = omdbResponse.data;

		const creditsResponse = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
		);
		const creditsData = creditsResponse.data;
		const actors = creditsData.cast?.map((actor) => ({
			name: actor.name,
			character: actor.character,
			image: actor.profile_path || defaultActorPoster,
		}));

		const movieData = {
			poster: tmdbData.poster_path || omdbData.Poster,
			title: tmdbData.title || omdbData.Title,
			year: tmdbData.release_date
				? tmdbData.release_date.substring(0, 4)
				: omdbData.Year,
			ratings: {
				tmdb: tmdbData.vote_average,
				imdb: omdbData.imdbRating,
				rottenTomatoes:
					omdbData.Ratings &&
					omdbData.Ratings.find((rating) => rating.Source === 'Rotten Tomatoes')
						?.Value,
				metaCritic: omdbData.Metascore,
			},
			genre: tmdbData.genres.map((genre) => genre.name),
			director: omdbData.Director || 'N/A',
			writers: omdbData.Writer || 'N/A',
			actors: actors,
			runTime: omdbData.Runtime || 'N/A',
			plot: omdbData.Plot || 'N/A',
			tagLine: tmdbData.tagline,
			trailers: [],
			language: tmdbData.original_language,
		};
		res.status(200).send(movieData);
	}),

	getRandomGreatMovies: asyncWrapper(async (req, res) => {
		const page = req.query.page || 1;
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
		);
		console.log(response);

		const data = response.data;
		let topMovies = data.results.map((movie) => ({
			name: movie.title,
			rating: movie.vote_average.toFixed(1),
			poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			year: new Date(movie.release_date).getYear(),
			id: movie.id,
			description: movie.overview,
		}));
		const shuffledMovies = shuffleArray(topMovies);
		res.send(shuffledMovies);
	}),

	getTopMovies: asyncWrapper(async (req, res) => {
		const page = req.query.page || 1;

		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`
		);
		const data = response.data;

		const topMovies = data.results.map((movie) => ({
			name: movie.title,
			rating: movie.vote_average.toFixed(1),
			poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
			year: movie.release_date.slice(0, 4),
			id: movie.id,
		}));

		res.send(topMovies);
	}),

	searchMovie: asyncWrapper(async (req, res) => {
		const searchTerm = req.query.searchTerm;
		const page = req.query.page;
		const response = await axios.get(
			`${TMDB_API_URL}?api_key=${
				process.env.TMDB_API_KEY
			}&language=en-US&query=${searchTerm}&page=${page.toString()}&include_adult=false`
		);
		const totalPages = response.data.total_pages;
		const results = response.data.results;
		const movies = [];
		const actors = [];
		results.forEach((result) => {
			if (result.media_type === 'movie') {
				movies.push({
					id: result.id,
					name: result.title,
					rating: result.vote_average.toFixed(1),
					poster: `${TMDB_IMAGE_URL}${result.poster_path}`,
					year: result.release_date.substring(0, 4),
				});
			} else if (result.media_type === 'person') {
				actors.push({
					id: result.id,
					name: result.name,
					poster: `${TMDB_IMAGE_URL}${result.profile_path}`,
				});
			}
		});
		res.send({ movies, actors, totalPages });
	}),
	advanceSearch: asyncWrapper(async (req, res) => {
		const from = req.query.from;
		const to = req.query.to;
		const MinmumRating = req.query.MinmumRating;
		const MinmumVotes = req.query.MinmumVotes;
		const Genre = req.query.Genre;
		const RunTime = req.query.RunTime;
		const page = req.query.page;
		let response;
		const baseurl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&include_adult=false`;
		response = await axios.get(
			baseurl +
				filterByQuery(from, to, MinmumRating, MinmumVotes, Genre, RunTime) +
				`&page=${page}`
		);
		console.log(req.query);
		const totalPages = response.data.total_pages;
		const felterdresults = response.data.results;
		const movies = [];
		felterdresults.forEach((r) => {
			movies.push({
				name: r.title,
				rating: r.vote_average.toFixed(1),
				poster: `${TMDB_IMAGE_URL}${r.poster_path}`,
				year: r.release_date.substring(0, 4),
			});
		});
		res.send({ movies, totalPages });
	}),
	addMovieRating: asyncWrapper(async (req, res) => {
		const { movieId, userId } = req.params;
		const { rating } = req.body;
		const movie = await Movie.findOne({ movieId });
		if (!movie) return res.send({ message: 'movie was not found' });
		const userIndex = movie.ratings.findIndex(
			(element) => element.userId.toString() === userId.toString()
		);

		if (userIndex > -1) movie.ratings[userIndex] = { userId, rating };
		else movie.ratings.push({ userId, rating });

		const savedUser = await movie.save();
		res.send(savedUser);
	}),
};
