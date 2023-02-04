import express from "express";
import "./DB/mongoose.js";
import cors from "cors";
import movieRouter from "./components/movies/movie.routes.js";

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api", movieRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`working together ..`);
});
