const mongoose =  require('mongoose')


const roomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    roomNumber:
    [{
        number:Number,
        unavailableDates:[{type:[Date]}]
    }]

},{timestamps: true})

const Room = mongoose.model('Rooms', roomSchema)
module.exports.Room = Room;