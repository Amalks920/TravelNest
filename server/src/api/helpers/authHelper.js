const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signupHelper = function (data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await userModel.create(data)
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

const loginHelper = function ({ email, password, role }) {
    return new Promise(async (resolve, reject) => {
        try {

            const foundUser = await userModel.findOne({ email: email, role: role })

            if (!foundUser) return reject('user not found')

            if (foundUser.isBlocked === true) reject('user is blocked')
            console.log(foundUser)
            if (await foundUser.isPasswordMatched(password)) {

                const accessToken = jwt.sign(
                    { 'username': foundUser.username },
                    process.env.ACCESS_TOKEN_PRIVATE_KEY,
                    { expiresIn: '30d' }
                )

                const refreshToken = jwt.sign(
                    { "username": foundUser.username },
                    process.env.REFRESH_TOKEN_PRIVATE_KEY,
                    { expiresIn: '1d' }
                )

                await userModel.updateOne(
                    { email: email },
                    { $set: { refreshToken: refreshToken } }
                )
                resolve({ foundUser, accessToken })
            }else{
                return reject('password is incorrect')
            }


        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    signupHelper, loginHelper
}