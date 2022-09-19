const express = require('express');
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
//setting up the database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB connected')
});

//Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//Middlewares
app.use(cors({
    origin:'*',
    credentials:true
}))
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



const PORT  = process.env.PORT || 8000
app.listen(PORT, ()=>{console.log(`Booking App started at port ${PORT}`)})