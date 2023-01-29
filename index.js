import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`working together ..`);
});
