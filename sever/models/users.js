const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        },
        password: {
            type: String,
            required: true,
        
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        phone: {
            type: Number,
        },
        access_token: {
            type: String,
            require: true,
        },
        refresh_token: {
            type: String,
            require: true,
        },
      
        

    },
    { timestamps: true }
    
);

const User = mongoose.model("User", userSchema);
module.exports = User;