import logger from "../../services/logger/index.js";
import Movie from "./movie.models.js";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../middleware/asyncWrapper.js";

export const productControllers = {
  addMovie: asyncWrapper(async (req, res, next) => {
    const movie = await Movie.create(req.body);
    res.status(StatusCodes.CREATED).send(movie);
  }),
};
