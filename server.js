//import
const express = require("express");
const mongoose = require("mongoose");

//make express app
const app = express();

//handle JSON rq
app.use(express.json());

//connect 2 db
mongoose
  .connect("mongodb://localhost/review")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error + "fix your code");
  });

//root
app.get("/", (req, res) => {
  res.send("initialized");
});

//!server start
app.listen(5555, () => {
  console.log("Running @ http://localhost:5555");
});
