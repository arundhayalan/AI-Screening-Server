const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    address:String,
    country:String,
    state:String,
    phonenumber:String
})

const userModel = mongoose.model("usersData", userSchema );
module.exports = userModel;