const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../key')
const requireLogin = require('../middleware/requireLogin')
// const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemailer-sendgrid-transport')

//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
// 


// const transporter = nodemailer.createTransport(sendgridTransport({
//   auth:{
//     api_key:"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"
//   }
// })) 


// router.get('/protected',requireLogin, (req,res)=>{
//   res.send("this routing is for only checking purpose")
// })

//making signup route and handling error
router.post('/signup',(req,res)=>{
  const {name,email,password} = req.body 
  if(!email || !password || !name){
     return res.status(422).json({error:"required all fields"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exist"})
      }
      //hashing password
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                //pic
            })
    
            user.save()
            .then(user=>{
              // transporter.sendMail({
              //   to:user.email,
              //   from:"no-reply@instgram.com",
              //   subject:"signup sucessful",
              //   html:"<h1>Welcome to instagram</h1>"
              // })
              
                res.json({message:"successfully done"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
})

//making signin route
router.post('/signin',(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
     return res.status(422).json({error:"require  email or password"})
  }
  User.findOne({email:email})
  .then(savedUser=>{
      if(!savedUser){
         return res.status(422).json({error:"Invalid Email or password"})
      }
      bcrypt.compare(password,savedUser.password)
      .then(doMatch=>{
          if(doMatch){
               //res.json({message:"successfully signed in"})
             const token = jwt.sign({_id:savedUser._id},JWT_SECRET)//generating toke on the basis of suer id
            //  const {_id,name,email,followers,following,pic} = savedUser
            //  res.json({token,user:{_id,name,email,followers,following,pic}})
            const {_id,name,email} =savedUser
            res.json({token,user:{_id,name,email}})
          }
          else{
              return res.status(422).json({error:"Invalid Email or password"})
          }
      })
      .catch(err=>{
          console.log(err)
      })
  })
})

module.exports = router