import { Router } from "express";
import express from "express";

import {
  addMovie,
  // deleteMovies,
  getLatestMovies,
  // getMovieById,
  // getMovies,
  // updateMovies,
} from "./movie.controllers.js";
import { asyncWrapper } from "../../middleware/asyncWrapper.js";

const movieRouter = Router();

// router.get('/movies', getMovies);
// router.get('/movie/:id', getMovieById);
// router.post('/movies/add', movieSchema, addMovie);
movieRouter.post("/movies/add", asyncWrapper(addMovie));
// router.delete('/movies/delete/:id', deleteMovies);
// router.patch('/movies/update/:id', updateMovies);
movieRouter.get("/movies/latest", asyncWrapper(getLatestMovies));

export default movieRouter;
