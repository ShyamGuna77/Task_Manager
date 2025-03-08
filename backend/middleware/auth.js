

const jwt = require('jsonwebtoken');

const User = require('../models/User')


//Authentican Middleware

const authMiddleware = async (req,resizeBy,next) => {
    try {

      const token = req.header('Authorization')?.replace('Bearer','') 
      
      if(!token){
        return res.status(401).json({message:"Authentication Token required"})        
      }

      // Wee need to verify Token here 

      const decoded = jwt.verify(token,process.env.JWT_SECRET)
      console.log(decoded);
      const user = await User.findById(decoded.userId)
      if(!user){
        res.status(401).json({message:"Invalid Token"})
      }

      req.user = user;
      req.userId = user._id;

      next()

    } catch (error) {
        res.status(401).json({message:"Authentication failed"})
    }
}

module.exports = authMiddleware;
