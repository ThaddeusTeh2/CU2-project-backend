const { Schema, model } = require("mongoose");

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eId: { type: mongoose.Schema.Types.ObjectId, required: true },
  eType: { type: String, enum: ["car", "comment"] },
});

const Like = model("Like", likeSchema);

module.exports = Like;
