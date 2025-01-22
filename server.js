//import
const express = require("express");
const mongoose = require("mongoose");

//make express app
const app = express();

//handle JSON rq
app.use(express.json());

//connect 2 db
mongoose
  .connect()
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log(error + "fix your code");
  });
