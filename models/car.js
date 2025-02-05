const { Schema, model } = require("mongoose");

const carSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    image: String,
  },
  {
    timestamps: true,
  }
);

carSchema.index({ name: "text" });

const Car = model("Car", carSchema);

module.exports = Car;
