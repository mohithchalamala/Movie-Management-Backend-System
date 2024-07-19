// require("dotenv").config();
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')



const app = express();

app.use(cors())
app.use(express.json())

app.listen(3000)

//mongodb connection

mongoose.connect('mongodb+srv://mohithchalamala:16461646@cluster0.778x2cg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then((result)=>{
    console.log('MongoDB Connected')
})
.catch(e=>{
    console.log()
})


//routes

app.get('/',(req,res)=>{
    res.json("Server start")
}) 

//user routes

const userAuthroutes = require ('./routes/user/userAuthroutes')

app.use("/userauth/api",userAuthroutes)


//movie routes

const movieroutes = require('./routes/movie/movieroutes')

app.use('/movies/api',movieroutes)
