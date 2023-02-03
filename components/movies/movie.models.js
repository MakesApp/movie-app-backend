import mongoose from 'mongoose';
import BodyParser from 'body-parser';
import Joi from 'joi';
import joigoose from 'joigoose';
import express from 'express';

const joi2 = joigoose(mongoose);
const app = express();
const router = express.Router();
app.use('/api', router);
app.use(BodyParser.json());

app.use(express.json());

export const movieSchema = Joi.object().keys({
	title: Joi.string().required(),
	releaseDate: Joi.date().required(),
	genre: Joi.string().valid('action', 'comedy', 'drama', 'sci-fi').required(),
	director: Joi.string().required(),
});

const mongooseSchema = new mongoose.Schema(joi2.convert(movieSchema));

const Movie = mongoose.model('Movie', mongooseSchema);

export default Movie;
