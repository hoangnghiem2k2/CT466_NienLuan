const userModel = require("../models/users");
const userService = require("../services/usersService")
const bcrypt = require("bcrypt");
const createUser = async (req,res)=>{
  try{
    const {  userName, password,confirmpassword, phone,email } = req.body;
    if (
      !userName ||
      !password ||
      !confirmpassword||
      !email ||
      !phone
    ) {
      return res.status(200).json({ message: "All filled must be required" });
    } else if (confirmpassword != password){
      return res.status(200).json({ message: "The confirm password didn't match with the password" });
    }
    const response = await  userService.createUser(req.body);
    return res.status(200).json(response)
  } catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}

const loginUser = async (req,res)=>{
  try{
    const {   password, email } = req.body;
    if (
      !password ||
      !email
    ) {
      return res.status(200).json({ message: "All filled must be required" });
    } 
    const response = await  userService.createUser(req.body);
    return res.status(200).json(response)
  } catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}

const updateUser = async (req,res)=>{
  try{
    const {   password, email } = req.body;
    if (
      !password ||
      !email
    ) {
      return res.status(200).json({ message: "All filled must be required" });
    } 
    const response = await  userService.createUser(req.body);
    return res.status(200).json(response)
  } catch(e) {
    return res.status(404).json({
      message: e
    })
  }
}

class User {
    async getAllUser(req, res) {
      try {
        let Users = await userModel
          .find({})
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Users) {
          return res.json({ Users });
        }
      } catch (err) {
        console.log(err);
      }
    }

    async getSingleUser(req, res) {
        let { uId } = req.body;
        if (!uId) {
          return res.json({ error: "All filled must be required" });
        } else {
          try {
            let User = await userModel
              .findById(uId)
              .select("name email phoneNumber userImage updatedAt createdAt");
            if (User) {
              return res.json({ User });
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    
    
      async postEditUser(req, res) {
        let { uId, email, phoneNumber } = req.body;
        if (!uId || !email || !phoneNumber) {
          return res.json({ message: "All filled must be required" });
        } else {
          let currentUser = userModel.findByIdAndUpdate(uId, {
            email: email,
            phoneNumber: phoneNumber,
            updatedAt: Date.now(),
          });
          currentUser.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "User updated successfully" });
          });
        }
      }
    
      async getDeleteUser(req, res) {
        let { oId, status } = req.body;
        if (!oId || !status) {
          return res.json({ message: "All filled must be required" });
        } else {
          let currentUser = userModel.findByIdAndUpdate(oId, {
            status: status,
            updatedAt: Date.now(),
          });
          currentUser.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "User updated successfully" });
          });
        }
      }
    
      async changePassword(req, res) {
        let { uId, oldPassword, newPassword } = req.body;
        if (!uId || !oldPassword || !newPassword) {
          return res.json({ message: "All filled must be required" });
        } else {
          const data = await userModel.findOne({ _id: uId });
          if (!data) {
            return res.json({
              error: "Invalid user",
            });
          } else {
            const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
            if (oldPassCheck) {
              newPassword = bcrypt.hashSync(newPassword, 10);
              let passChange = userModel.findByIdAndUpdate(uId, {
                password: newPassword,
              });
              passChange.exec((err, result) => {
                if (err) console.log(err);
                return res.json({ success: "Password updated successfully" });
              });
            } else {
              return res.json({
                error: "Your old password is wrong!!",
              });
            }
          }
        }
      }
}

const UsersController = new User();
module.exports = {
  createUser,
  loginUser,
  updateUser
 // UsersController
}