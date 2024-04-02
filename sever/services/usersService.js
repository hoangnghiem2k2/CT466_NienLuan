const { compare } = require("bcrypt");
const user = require("../models/users");
const { generalRefressToken } = require("./jwtService");
const bcrypt = require("bcrypt");

//const access_token = require('./jwtService')
const createUser = (newUser)=> {
    return new Promise (async (resolve,reject)=>{
        const {  userName, password, phone,email } = newUser;
        try{
            const checkUser = await user.findOne ({
                email: email,
                phone: phone
            })
            if(checkUser!==null){
                resolve({
                    status: 'ok',
                    message: 'Your phone number and email are already sign up',
                })
            }
            const hash = bcrypt.hashSync(password,10)

            const createdUser = await user.create({
                userName, password:hash, phone,email
            })
            if(createdUser) {
                resolve({
                    status: 'ok',
                    message: 'succes',
                    data: createdUser
                })
            }

        }catch(e) {
            reject(e);
        }
    })
}

const loginUser = (userLogin)=> {
    return new Promise (async (resolve,reject)=>{
        const {  userName, password,confirmpassword, phone,email,isAdmin } = userLogin;
        try{
            const checkUser = await user.findOne ({
                email: email
            })
            if(checkUser===null){
                resolve({
                    status: 'ok',
                    message: 'The account is not defined',
                })
            }

            const comparePassword = bcrypt.compareSync(password,checkUser.password);
            if(!comparePassword) {
                resolve({
                    status: 'ok',
                    message: 'The account is not defined',
                })
            } 

            const access_token = await generalAccesToken({
                id: checkUser.id,
                isAdmin : checkUser.isAdmin,
            })
            const refresh_token = await generalRefressToken({
                id: checkUser.id,
                isAdmin : checkUser.isAdmin,
            })
            resolve({
                status: 'ok',
                message: 'success',
                access_token,
                refresh_token
            })

            

            

           

        }catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createUser,
    loginUser
}