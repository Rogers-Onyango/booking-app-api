const express = require('express')
const router = express.Router()
const {register,login} = require('../Controllers/auth')
//register
router.post('/register',register)

//login
router.post('/login',login)


module.exports = router