const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

//making user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,

    pic:{
        type:String,
        default:"https://res.cloudinary.com/ds9gf8buk/image/upload/v1593145936/instagram-3814049_1280_j8dn0z.png"
       },

    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema)



