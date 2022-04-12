const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title field is missing. "],
    },
    content: {
      type: String,
      required: [true, "content field is missing. "],
    },
    status: {
      type: String,
      enum: ["DISABLE", "ACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
