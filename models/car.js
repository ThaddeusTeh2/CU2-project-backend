const { Schema, model } = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: Schema.Types.ObjectId,
    ref: "Type",
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  like: {
    type: Schema.Types.ObjectId,
    ref: "Like",
  },
  image: String,
});

const Car = model("Car", carSchema);

module.exports = Car;
