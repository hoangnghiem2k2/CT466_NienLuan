const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema(
    {
        iName:{
            type: String,
            require: true,
        },
        measurement :{
            type: String,
            require: true,
        }

    },
    { timestamps: true }
);

const ingredientsModel = mongoose.model("ingredients",ingredientsSchema);
module.exports = ingredientsModel;