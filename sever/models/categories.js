const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
  {
    Type: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;