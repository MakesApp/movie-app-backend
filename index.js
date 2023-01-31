import express from "express";
import "./services/DB/mongoose.js";
import cors from "cors";
import router from "./components/movies/movie.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
