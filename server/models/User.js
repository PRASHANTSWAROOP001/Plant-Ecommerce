const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    
    userName:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required: true,
        unique:true
    },
    
    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        required:true,
    }
})


const User = mongoose.model("user",userSchema,"user");
module.exports = User;