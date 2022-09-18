const { User } = require("../models/User")
const { createError } = require("../utils/error")


//update
let updateUser = async(req,res,next) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
        res.status(200).json( updatedUser)
    }catch(err){
        next(err)
    }
}
//delete
let deleteUser = async(req,res,next) =>{
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.status(200).json( "User has been deleted")
    }catch(err){
        next(err)
    }
}
//get
let getUser = async(req,res,next) =>{
    try{
        const user = await User.find(req.params.id)
        res.status(200).json( hotel)
    }catch(err){
        next(err)
    }
}
//Get all
let getUsers = async(req,res,next) =>{
    
    try{
        const users = await User.find()
        res.status(200).json( users)
    }catch(err){
        next(err)
    }
}
module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers
}