const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const auth = require("../middleware/auth");

/// create a Register route and login route and /me to verify token for authentication4

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

  
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists " });
    }

    
    const user = new User({
      username,
      email,
      password,
    });

    // save the user to the database
    await user.save();

    // generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


});

//Login route

router.post('/login',async(req,res) => {
    try {
        
        const {email,password} = req.body;
        console.log("Login attempt email",email)
        const user = await User.findOne({email});
          console.log("User found:", user ? "Yes" : "No");

        if(!user){
            return res.status(401).json({message:"Inavalid Credintials"})
        }

        // use comparePassword that created in user model
             
        const isMatch = await user.comparePassword(password);
         console.log("Password match:", isMatch);
         if (!isMatch) {
           return res.status(401).json({ message: "Invalid credentials" });
         }

          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          res.json({
            token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
            },
          });

    } catch (error) {
          res.status(500).json({ message: error.message });
    }
})

// get the user route 

router.get('/me',auth,async (req,res)=>{
       try {
        res.json({
            user:{
                id:req.user._id,
                username:req.user.username,
                email:req.user.email
            }
        })
        
       } catch (error) {
           res.status(500).json({ message: error.message });
       }
})

module.exports = router;
