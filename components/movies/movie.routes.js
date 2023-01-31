import { Router } from "express";
import { celebrate } from "celebrate";
import obj from "../movies/validation/movieRoutesValidation.js";
import {
  addMovie,
  deleteMovies,
  example,
  getMovieById,
  getMovies,
  updateMovies,
} from "./movie.controllers.js";

const router = Router();

router.get("/example/:exampleParam",
//  celebrate({ ...obj.example }),
 example);
router.get("/movies", getMovies);
router.get("/movie/:id", getMovieById);
router.post("/movies/add", addMovie);
router.delete("/movies/delete/:id", deleteMovies);
router.patch("/movies/update/:id", updateMovies);

export default router;
