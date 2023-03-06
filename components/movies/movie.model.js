const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	movieId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	ratings: [
		{
			rating: {
				type: Number,
				min: 1,
				max: 5,
				required: true,
			},
			userId: mongoose.Schema.Types.ObjectId,
		},
	],
	reviews: [
		{
			userId: {
				type: mongoose.Schema.Types.ObjectId,
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
