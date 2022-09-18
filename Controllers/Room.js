const {Room} = require('../models/Room')
const {Hotel} = require('../models/Hotel')
const {createError} = require("../utils/error")

let createRoom = async(req,res,next) =>{
    const hotelId = req.params.hotelId
    const newRoom = new Room(req.body)
    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms: savedRoom._id}})
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
}
//update
let updateRoom = async(req,res,next) =>{
    try{
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
        res.status(200).json( updatedRoom)
    }catch(err){
        next(err)
    }
}
//delete
let deleteRoom = async(req,res,next) =>{
    const hotelId = req.params.hotelId
    try{
        const deleteRoom = await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
        }catch(err){
            next(err)
        }
        res.status(200).json( "Room has been deleted")
    }catch(err){
        next(err)
    }
}
//get
let getRoom = async(req,res,next) =>{
    try{
        const room = await Room.find(req.params.id)
        res.status(200).json(room)
    }catch(err){
        next(err)
    }
}
//Get all
let getRooms = async(req,res,next) =>{
    
    try{
        const rooms = await Room.find()
        res.status(200).json( rooms)
    }catch(err){
        next(err)
    }
}
let updateRoomAvailability = async (req, res, next) => {
try {
    await Room.updateOne(
    { "roomNumbers._id": req.params.id },
    {
        $push: {
        "roomNumbers.$.unavailableDates": req.body.dates
        },
    }
    );
    res.status(200).json("Room status has been updated.");
} catch (err) {
    next(err);
}
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoomAvailability
}