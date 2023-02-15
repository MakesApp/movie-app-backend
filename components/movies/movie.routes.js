import { Router } from "express";

import moviesController from "./movie.controllers.js";

const movieRouter = Router();

movieRouter.get("/random", moviesController.getRandomGreatMovies);
movieRouter.get("/latest", moviesController.getLatestMovies);
movieRouter.get("/:id", moviesController.getDetailedMovie);
movieRouter.get("/movies/getTopMovies", moviesController.getTopMovies);

export default movieRouter;
