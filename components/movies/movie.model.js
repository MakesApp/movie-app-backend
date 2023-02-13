import { model, Schema } from 'mongoose';

const movieSchema = new Schema({
	name: {
		type: String,
		unique: true,
		dropDups: true,
	},
	number: { type: String, required: true },
});

export const Movie = model('Movie', movieSchema);
