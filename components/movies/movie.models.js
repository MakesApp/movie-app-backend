import mongoose from 'mongoose';
// import { celebrate, Joi as CelebrateJoi } from 'celebrate';
import joigoose from 'joigoose';
import express from 'express';
import Joi from 'joi';
const joi2 = joigoose(mongoose);
const app = express();
const router = express.Router();
app.use('/api', router);

app.use(express.json());

const movieSchema = Joi.object({
	title: Joi.string().required(),
	releaseDate: Joi.date().required(),
	genre: Joi.string().valid('action', 'comedy', 'drama', 'sci-fi').required(),
	director: Joi.string().required(),
});

const mongooseSchema = new mongoose.Schema(joi2.convert(movieSchema));

const Movie = mongoose.model('Movie', mongooseSchema);

export default Movie;
