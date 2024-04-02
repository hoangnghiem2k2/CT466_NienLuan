const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoriesController");
//const { loginCheck } = require("../middleware/auth");



router.get("/all-category", categoryController.getAllCategory);
//router.post(
 // "/add-category",
 // loginCheck,
  //upload.single("cImage"),
 // categoryController.postAddCategory
//);
//router.post("/edit-category", loginCheck, categoryController.postEditCategory);
//router.post(
  //"/delete-category",
 // loginCheck,
 // categoryController.getDeleteCategory
//);

module.exports = router;