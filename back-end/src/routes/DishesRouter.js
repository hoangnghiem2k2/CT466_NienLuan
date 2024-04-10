const express = require("express");
const router = express.Router()
const DishesController = require('../controllers/DishesController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create', authMiddleWare, DishesController.createProduct)
router.put('/update/:id', authMiddleWare, DishesController.updateProduct)
router.get('/get-details/:id', DishesController.getDetailsProduct)
router.delete('/delete/:id', authMiddleWare, DishesController.deleteProduct)
router.get('/get-all', DishesController.getAllProduct)
router.post('/delete-many', authMiddleWare, DishesController.deleteMany)
router.get('/get-all-type', DishesController.getAllType)

module.exports = router