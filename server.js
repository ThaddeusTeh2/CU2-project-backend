//import
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//make express app
const app = express();

//handle JSON rq
app.use(express.json());

//connect 2 db
mongoose
  .connect(process.env.MONGODB_URL + "/review")
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

//TODO import all routes
const carRouter = require("./routes/car");
const typeRouter = require("./routes/type");
const brandRouter = require("./routes/brand");
const commentRouter = require("./routes/comment");
const likeRouter = require("./routes/like");

app.use("/api/car", carRouter);
app.use("/api/type", typeRouter);
app.use("/api/brand", brandRouter);
app.use("/api/comment", commentRouter);
app.use("/api/like", likeRouter);

app.use("/api/auth", require("./routes/user"));

//!server start
app.listen(5555, () => {
  console.log("Running @ http://localhost:5555");
});
