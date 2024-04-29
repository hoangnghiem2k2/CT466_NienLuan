const bookingTableService = require('../services/TableService');

// Controller functions for CRUD operations
exports.createBooking = async (req, res) => {
    try {
        const booking = await bookingTableService.createBooking(req.body);
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await bookingTableService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const booking = await bookingTableService.getBooking();
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await bookingTableService.updateBooking(req.params.id, req.body);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const booking = await bookingTableService.deleteBooking(req.params.id);
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
