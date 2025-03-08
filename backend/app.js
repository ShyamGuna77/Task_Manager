


const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config();


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 5000;

app.use(cors)


mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    console.log("Database connected Sucessfully")
})
.catch(err => console.log("Error Connecting DataBase ", err))


//Routes





app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});




app.listen(PORT,()=>{
    console.log(`Server Listening on ${PORT}`);
})