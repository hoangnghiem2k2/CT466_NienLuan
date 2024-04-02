const express = require("express");
const router = express.Router();
const DishesController = require("../controller/dishesController");


router.get("/all-dishes", DishesController.getAllDishes);
router.post("/dishes-by-category", DishesController.getDishesByCategory);
router.post("/dishes-by-price", DishesController.getDishesByPrice);
router.post("/cart-product", DishesController.getCartDish);

//router.post("/add-product", upload.any(), DishesController.postAddDish);
//router.post("/edit-product", upload.any(), DishesController.postEditDish);
router.post("/delete-dishes", DishesController.getDeleteDish);
router.post("/single-dishes", DishesController.getSingleDish);

router.post("/add-review", DishesController.postAddReview);
router.post("/delete-review", DishesController.deleteReview);

module.exports = router;