import mongoose from 'mongoose';
const movieSchema = new mongoose.Schema({
	movieId: {
		type: String,
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
			userId: {
				type: String,
				required: true,
			},
		},
	],

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
