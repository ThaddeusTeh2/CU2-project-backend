const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
  content: { type: String, required: true },
  likes: { type: Schema.Types.ObjectId, ref: "Like" },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
