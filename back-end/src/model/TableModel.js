const mongoose = require('mongoose');

// Define the schema for the booking table
const bookingTableSchema = new mongoose.Schema({
    numberTable: {
        type: Number,
        require: true,

    },
    name: {
        type:  String,
        required: true
    },
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    maxCustomer: {
        type: Number,
        required: true
    },
    bookingTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const BookingTable = mongoose.model('BookingTable', bookingTableSchema);

module.exports = BookingTable;
