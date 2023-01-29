import express from "express";
import './DB/mongoose.js'
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

