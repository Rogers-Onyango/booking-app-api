const jwt = require('jsonwebtoken')
const {createError} = require('./error')

let verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token
    if(!token){
        return next(createError(401,"You are not Authenticated!"))
    }
    jwt.verify(token,'RollinsOchieng',(err,user)=>{
        if(err){
            return next(createError(403,"Invalid token!"))
        }
        req.user = user
        next()
    })
}

let verifyUser = (req,res,next) =>{
    verifyToken(req,res, next, ()=>{
        if(req.user.id === req.params.id  || req.user.isAdmin){
            next()
        }else{
                return next(createError(403,"You are not authorised"))
        }
    })
}
let verifyAdmin = (req,res,next) =>{
    verifyToken(req,res, next, ()=>{
        if(req.user.isAdmin){
            next()
        }else{
                return next(createError(403,"You are not authorised"))
        }
    })
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
}