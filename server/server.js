const express = require('express')
const app=express();
const mongoose = require('mongoose')
const route=require('./route/route')
require("dotenv").config();
var cors = require('cors')

app.use(cors()) 
mongoose.connect('mongodb+srv://bini-man:biniMAN123..@cluster0.tcrqx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
() => console.log('connected to db')
);
app.use(express.json())
app.use('/api',route)
app.listen(3001, ()=>{
    console.log("server started")
})
