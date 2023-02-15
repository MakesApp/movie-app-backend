import express from "express";
import "./services/DB/mongoose.js";
import cors from "cors";
import movieRouter from "./components/movies/movie.routes.js";
import errorHandlerMiddleware from "./middleware/error-handler-middleware.js";
import notFoundRoute from "./middleware/not-found-middleware.js";
import morgan from "morgan";
import logger from "./services/logger/index.js";
import "./services/DB/mongoose.js";
import "./services/logger/index.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.options("*", cors());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, HEAD"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

const PORT = 5000;
app.use("/api/movies", movieRouter);

app.use(notFoundRoute);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
