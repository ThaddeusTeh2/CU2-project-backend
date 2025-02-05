const { Schema, model } = require("mongoose");

const typeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

typeSchema.index({ name: "text" });

const Type = model("Type", typeSchema);
module.exports = Type;
