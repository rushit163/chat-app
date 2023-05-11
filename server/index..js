const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes')
require('dotenv').config();

const app = express()

app.use(cors())
app.use(express.json());

app.use('/api/auth',userRoutes)


mongoose.connect(process.env.MONGO_URL,{useNewUrlParser : true,useUnifiedTopology : true})
    .then(()=>{
        console.log("connected successfully")
    })
    .catch((err)=>{
        console.log(err.message)
    })

const server = app.listen(process.env.PORT,()=>{
    console.log("On port 5000");
})
