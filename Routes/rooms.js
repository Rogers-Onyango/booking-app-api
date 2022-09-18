const express = require('express')
const { createRoom, updateRoom, getRooms, getRoom, deleteRoom, updateRoomAvailability } = require('../Controllers/Room')
const { verifyAdmin } = require('../utils/verifyToken')
const router = express.Router()

//Create 
router.post('/:hotelId',createRoom)
//update
router.put('/:id',verifyAdmin,updateRoom)
router.put("/availability/:id", updateRoomAvailability);
//delete
router.delete('/:id/:hotelId',deleteRoom)
//get
router.get('/:id',getRoom)
//getAll
router.get('/',getRooms)

module.exports = router