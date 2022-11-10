const mongoose = require("mongoose");

const Student = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    gender: String,
    degree: String,
    Email: String,
    phone:Number
})

module.exports = mongoose.model("Student",Student);