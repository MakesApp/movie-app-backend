import { Router } from "express";
import { asyncWrapper } from "../../middleware/asyncWrapper.js";

import {
  // addMovie,
  // deleteMovie,
  // getMovieById,
  // getAllMovies,
  // updateMovie,
  // getLatestMovies,
  productControllers,
} from "./movie.controllers.js";

const router = Router();

// router.get("/movies/latest", asyncWrapper(getLatestMovies));
// router.get("/movies", asyncWrapper(getAllMovies));
// router.get("/movies/:id", asyncWrapper(getMovieById));
router.post("/movies/add", productControllers.addMovie);
// router.delete("/movies/:id", asyncWrapper(deleteMovie));
// router.patch("/movies/:id", asyncWrapper(updateMovie));

export default router;
