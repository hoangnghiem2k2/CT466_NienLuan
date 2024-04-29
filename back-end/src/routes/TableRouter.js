const express = require("express");
const router = express.Router()
const TableController = require('../controllers/TableController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/bookings', TableController.createBooking);

router.get('/bookings/:id', TableController.getBookingById);
router.get('/bookings', TableController.getAll);

router.put('/bookings/put/:id', TableController.updateBooking);

router.delete('/bookings/:id', TableController.deleteBooking);



module.exports = router