const userModel = require("../models/users");
//onst bcrypt = require("bcryptjs");

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
    
      async postAddUser(req, res) {
        let {  userName, password, phone,email } = req.body;
        if (
          !userName ||
          !password ||
          !email ||
          !phone
        ) {
          return res.json({ message: "All filled must be required" });
        } else {
          try {
            let newUser = new userModel({
                userName ,
                password ,
                email ,
                phone
            });
            let save = await newUser.save();
            if (save) {
              return res.json({ success: "User created successfully" });
            }
          } catch (err) {
            return res.json({ error: error });
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
module.exports = UsersController;