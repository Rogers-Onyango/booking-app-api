const express = require('express')
const router = express.Router()
const {updateUser, deleteUser, getUser, getUsers} = require('../Controllers/User')
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken')


//authenticated User
router.get('/checkAuthenticated',verifyToken,(req,res,next)=>{
    res.send("You are now logged in")
})

//check user

router.get('/checkuser/:id',verifyUser,(req,res,next)=>{
    res.send("hello user, you are now logged in and can delete your account")
})

//check Admin
router.get('/checkadmin/:id',verifyAdmin,(req,res,next)=>{
    res.send("hello user, you are now logged in and can delete your account")
})
//update
router.put('/:id',verifyUser,updateUser)
//delete
router.delete('/:id',verifyUser,deleteUser)
//get
router.get('/:id',verifyUser,getUser)
//getAll
router.get('/',verifyAdmin,getUsers)

module.exports = router