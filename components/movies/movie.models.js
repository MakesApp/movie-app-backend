// import mongoose from "mongoose";
import Joi from "@hapi/joi";
import { celebrate, Joi as CelebrateJoi } from "celebrate";
import express from "express";

const app = express();
import Joi from "joi";

app.use(express.json());

const movieSchema = Joi.object({
  title: Joi.string().required(),
  releaseDate: Joi.date().required(),
  genre: Joi.string().valid("action", "comedy", "drama", "sci-fi").required(),
  director: Joi.string().required(),
});

export const createMovieRoute = celebrate({
    body: movieSchema,
  });
  
// const Movies = mongoose.model("Movies", movieSchema);

// export { Movies };
