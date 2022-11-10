const mongoose = require("mongoose");

const profile = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    gender:String,
    email: String,
    category:String,
    url:String,
    about:String
})



module.exports = mongoose.model("profile",profile);