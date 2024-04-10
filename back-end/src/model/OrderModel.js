const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        dish: { type: ObjectId, ref: "dishes",require: true,},
        amount: {
          type: Number,
          required: true,
          
      },
      image: { type: String, required: true },
      price: { type: Number, required: true },
    },
    ],
    user: {
      type: ObjectId,
      ref: "users",
      required: true,
    },
      
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Done",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;