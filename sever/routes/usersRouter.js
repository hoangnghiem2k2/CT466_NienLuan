const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");

//router.get("/all-user", usersController.getAllUser)
//router.post("/signle-user", usersController.getSingleUser)
router.post('/sign-up',usersController.createUser)
router.post('/sign-in',usersController.loginUser)
router.post('/update:id',usersController.updateUser)
//router.post("/add-user", usersController.postAddUser);
//router.post("/edit-user", usersController.postEditUser);
//router.post("/delete-user", usersController.getDeleteUser);

//router.post("/change-password", usersController.changePassword);

module.exports = router;