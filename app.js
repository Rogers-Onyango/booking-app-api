const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
//setting up the database
mongoose.connect('mongodb://localhost:27017/BookingApp');

//Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//Middlewares
app.use(cors())
app.use(cookieParser())
//Routes middlewares
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/users',require('./Routes/users'))
app.use('/api/hotels',require('./Routes/hotel'))
app.use('/api/rooms',require('./Routes/rooms'))
// another middleware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status:errorStatus,
        message:errorMessage,
        stack: err.status
    })
})

//Serve static assets if we are in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('booking-app-ui/build'))

    app.get('*',(req,res)=>{
        res.senfFile(path.resolve(__dirname, 'booking-app-ui', 'build', 'index.html'))
    })
}


const PORT  = process.env.PORT || 8000
app.listen(PORT, ()=>{console.log(`Booking App started at port ${PORT}`)})