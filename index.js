import express from "express";
import "./services/DB/mongoose.js";
import cors from "cors";
import movieRouter from "./components/movies/movie.routes.js";
import errorHandlerMiddleware from "./middleware/error-handler-middleware.js";
import notFoundRoute from "./middleware/not-found-middleware.js";

const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api", movieRouter);
app.use(notFoundRoute);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
