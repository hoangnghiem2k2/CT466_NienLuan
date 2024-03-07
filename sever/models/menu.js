const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const menuSchema = new mongoose.Schema(
    {
        theme: {
            type: String,
        },
        appetizer: [
            {
                id: { type: ObjectId, ref: "dishes" },
            },
        ],
        mainDishes: [
            {
                id: { type: ObjectId, ref: "dishes" },
            },
        ],
        dessert: [
            {
                id: { type: ObjectId, ref: "dishes" },
            },
        ],
        drink: [
            {
                id: { type: ObjectId, ref: "dishes" },
            },
        ],

    }
) 