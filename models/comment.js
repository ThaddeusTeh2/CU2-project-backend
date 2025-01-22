const { Schema, model } = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  content: { type: String, required: true },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
