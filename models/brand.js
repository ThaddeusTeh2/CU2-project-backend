const { Schema, model } = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Brand = model("Brand", brandSchema);
module.exports = Brand;
