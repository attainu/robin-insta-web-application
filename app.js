// importing packages
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = 5000
const {MONGOURI} = require('./key')




//connecting to database
mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
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

//server calling
app.listen(PORT,()=>{
    console.log("server is running",PORT)
})