const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username : {
        type : String,
        min : 3,
        max : 10,
        unique : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        min : 8,
        required : true
    }
})

module.exports = mongoose.model('User',userModel);