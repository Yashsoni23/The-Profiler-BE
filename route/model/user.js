const mongoose = require("mongoose");

const user = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    password: String,
    phone:Number,
    usertype:String,
    email: String,
})

module.exports = mongoose.model("user",user);