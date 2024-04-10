const express = require("express");
const router = express.Router()
const TableController = require('../controllers/TableController');
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.get('/',  TableController.getAllTable)
router.post('/create-table',authMiddleWare ,TableController.createTable)
router.put('/update-table/:id',authMiddleWare,  TableController.updateTable)
router.delete('/delete-table/:id',authMiddleWare,  TableController.deleteTable)

router.post('/booking/:id' , authUserMiddleWare ,TableController.bookTable)
router.post('/unbooking/:id', authUserMiddleWare  ,TableController.unBookTable)



module.exports = router