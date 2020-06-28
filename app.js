// importing packages
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8081
const {MONGOURI} = require('./config/key')


//connecting to database
mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true})

mongoose.connection.on('connected',()=>{
    console.log("connected to Database")
})
mongoose.connection.on('error',(err)=>{
    console.log("error showing",err)
})

//direct calling  modelschema
require('./models/user')
require('./models/post')


app.use(express.json())
app.use(require('./routes/auth.js'))
app.use(require('./routes/post.js'))
app.use(require('./routes/user.js'))

//deployment on heroku
if(process.env.NODE_ENV=="production"){
    app.use(express.static('front/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'front','build','index.html'))
    })
}


//server calling
app.listen(PORT,()=>{
    console.log("server is running",PORT)
})