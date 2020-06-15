const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")

//making routes
router.get('/',(req,res)=>{
  res.send('i am checking')
})

//making signup route and handling erro
router.post('/signup',(req,res)=>{
  const {name,email,password} = req.body
  if(!email || !password || !name){
    return res.status(422).json({error:"required all the feature"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
    if(savedUser){
      return res.status(422).json({error:"user already exit"})
    }
    //data storing in database
    const user = new User({
      email,
      password,
      name
    })
    user.save()
    .then(user=>{
      res.json({message:"saved sucessfully"})
    })
    .catch(err=>{
      console.log(err)
    })
  })
  .catch(err=>{
    console.log(err)
  })
})
  
module.exports = router