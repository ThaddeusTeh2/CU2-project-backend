const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  eId: { type: Schema.Types.ObjectId, required: true },
  eType: { type: String, enum: ["car", "comment"] },
});

const Like = model("Like", likeSchema);

module.exports = Like;
