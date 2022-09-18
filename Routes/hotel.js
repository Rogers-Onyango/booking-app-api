const express = require('express')
const router = express.Router()
const {createHotel,updateHotel,deleteHotel, getHotel, getHotels, CountByCity,countByType, getHotelRooms} = require('../Controllers/Hotel')
const { verifyAdmin } = require('../utils/verifyToken')

//Create 
router.post('/',createHotel)
//update
router.put('/:id',verifyAdmin,updateHotel)
//delete
router.delete('/:id',verifyAdmin,deleteHotel)
//get
router.get("/find/:id", getHotel);
//getAll
router.get('/',getHotels)

router.get('/countByCity',CountByCity)
router.get('/countByType',countByType)

router.get("/room/:id",getHotelRooms)


module.exports = router