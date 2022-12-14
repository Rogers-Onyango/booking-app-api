const { Hotel } = require("../models/Hotel")
const { createError } = require("../utils/error")
const { Room } = require("../models/Room")

//create
let createHotel = async(req,res,next) =>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        if (savedHotel){
            console.log("Hotel saved")
        }
        res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
}
//update
let updateHotel = async(req,res,next) =>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new: true})
        res.status(200).json( updatedHotel)
    }catch(err){
        next(err)
    }
}
//delete
let deleteHotel = async(req,res,next) =>{
    try{
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json( "Hotel has been deleted")
    }catch(err){
        next(err)
    }
}
//get
let getHotel = async (req, res, next) => {
try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
} catch (err) {
    next(err);
}
};
//Get all
let getHotels = async(req,res,next) =>{
    const {min, max, ...others} = req.query
    try{
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 999 },}).limit(req.query.limit)
        res.status(200).json( hotels)
    }catch(err){
        next(err)
    }
}
//get count by city
let CountByCity = async(req,res,next) =>{
    const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city =>{
         return Hotel.countDocuments({city:city})   
        }))
        res.status(200).json( list)
    }catch(err){
        next(err)
    }
}

//get Count by Type
let countByType = async(req,res,next) =>{
    try{
        const hotelCount =await Hotel.countDocuments({type:"Hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartments"})
        const resortCount =await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount =await Hotel.countDocuments({type:"cabin"});

        res.status(200).json([
            {type:"hotel",count:hotelCount},
            {type:"apartments",count:apartmentCount},
            {type:"resorts",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabins",count:cabinCount}
        ])
    }catch(err){
        next(err)
    }
}

//get hotel room
let getHotelRooms = async (req, res, next) => {
try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
    hotel.rooms.map((room) => {
        return Room.findById(room);
    })
    );
    res.status(200).json(list)
} catch (err) {
    next(err);
}
};
module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    CountByCity,
    countByType,
    getHotelRooms
}