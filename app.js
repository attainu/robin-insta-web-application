// importing packages
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = 5000
const {MONGOURI} = require('./key')

//direct calling user modelschema
require('./models/user')

app.use(express.json())
app.use(require('./routes/auth.js'))


//connecting to database
mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("error showing",err)
})

//server calling
app.listen(PORT,()=>{
    console.log("server is running",PORT)
})