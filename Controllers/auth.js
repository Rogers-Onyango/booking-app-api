const {User} = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { createError } = require('../utils/error')
let register = async(req,res,next) =>{
    try{
        const data = req.body
        const hashedPassword = bcrypt.hashSync(data.password,10)
        const newUser = new User({
            username: data.username,
            email: data.email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(200).send("User has been created")
    }catch(err){
        next(err)
    }

}

let login = async(req,res,next) =>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user)return next(createError(404,"User not found"))

        const correctPassword = await bcrypt.compare(req.body.password,user.password)

        if(!correctPassword) return next(createError(400,"Wrong Password"))

        //generating a token
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, "RollinsOchieng")

        //hiding some of the user details
        const {password, isAdmin, ...otherDetails} = user._doc
        res.cookie('access_token',token,{
            httpOnly: true
        }).status(200).json({...otherDetails})
    }catch(err){
        next(err)
    }

}
module.exports = {
    register,
    login
}