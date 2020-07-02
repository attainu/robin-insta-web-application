const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/key')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')


const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  }
})) 


// router.get('/protected',requireLogin, (req,res)=>{
//   res.send("this routing is for only checking purpose")
// })

//making signup route and handling error
router.post('/signup',(req,res)=>{
  const {name,email,password,pic} = req.body 
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
                pic
            })
    
            user.save()
            .then(user=>{
              transporter.sendMail({
                to:user.email,
                from:"myinstagramv12@gmail.com",
                subject:"signup sucessful",
                html:"<h1>Welcome to instagram</h1><p>you have sucessfully signup on instagram</p>"
              })
              
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
            const {_id,name,email,pic} =savedUser
            res.json({token,user:{_id,name,email,pic}})
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

//making router for reset passwaord

router.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"myinstagramv12@gmail.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click in this <a href="http://localhoast:3004/reset/${token}">link</a> to reset password</h5>
                  `
              })
              res.json({message:"check your email"})
          })

      })
  })
})

module.exports = router