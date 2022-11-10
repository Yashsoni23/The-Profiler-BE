const  express = require("express");
const mongoose = require("mongoose");
const router =  express.Router();
const student = require('./api/student');
const user = require("./api/user");
const profile = require("./api/profile");

mongoose.connect('mongodb+srv://yashsoni23:aegEw2Ni2OkYXkve@cluster0.gnrejz3.mongodb.net/?retryWrites=true&w=majority')

mongoose.connection.on('error',error=>
{console.log("connection fail")
});
mongoose.connection.on('connected',(connected)=>{
    console.log("connected");
})

router.use((req,res,next)=>{
    console.log('Time: ', Date.now());
    next();
})
router.use("/user",user);
router.use("/profile",profile);


router.get("/",((req,res)=>{
    res.send("Are you see me??");
}))

router.use("/student",student)
module.exports = router

