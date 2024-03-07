const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const DishSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Sold: {
        type: Number,
        default: 0,
    },   
    Category: {
        type: ObjectId,
        ref: "categories",
    },
    Images: {
        type: Array,
        required: true,
    },
    AllIngredients: [{
        Ingredient: {type: ObjectId, ref: "ingredients"},
    },
    
    ],
        
    
    RatingsReviews: [
        {
            review: String,
            user: { type: ObjectId, ref: "users" },
            rating: String,
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
    
},
{ timestamps: true }
);

const dishesModel = mongoose.model("dishes", DishSchema);
module.exports = dishesModel;