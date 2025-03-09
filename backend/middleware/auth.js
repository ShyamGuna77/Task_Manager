

const jwt = require('jsonwebtoken');

const User = require('../models/User')


//Authentican Middleware

const auth = async (req,res,next) => {
    try {

      const token = req.header('Authorization')?.replace('Bearer ','') 
       console.log("Extracted Token:", token); 
      
      if(!token){
        return res.status(401).json({message:"Authentication Token required"})        
      }

      // Wee need to verify Token here 

      const decoded = jwt.verify(token,process.env.JWT_SECRET)
       console.log("Decoded Token:", decoded);
      const user = await User.findById(decoded.userId)
       console.log("User Found:", user ? "Yes" : "No");
      if(!user){
        res.status(401).json({message:"Invalid Token"})
      }

      req.user = user;
      req.userId = user._id;

      next()

    } catch (error) {
         console.error("Auth Middleware Error:", error.message);
        res.status(401).json({message:"Authentication failed"})
    }
}

module.exports = auth;
