const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Username is required"],
    minlength:4
  },
  password:{
    type:String,
    trim:true,
    required:[true,"Password Required"]
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

