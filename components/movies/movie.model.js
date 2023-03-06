const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	movieId: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true,
	},
	reviews: [
		{
			userId: {
				type: String,
				required: true,
			},
			content: {
				type: String,
			},
		},
	],
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
