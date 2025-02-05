const { Schema, model } = require("mongoose");

const brandSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

brandSchema.index({ name: "text" });

const Brand = model("Brand", brandSchema);
module.exports = Brand;
