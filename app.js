const express = require('express')
require('dotenv').config()

const mongoose = require('mongoose')





const app = express()




app.use(express.json())





app.listen(5000, () => {

    mongoose.connect(process.env.MONGO_URI).then((res) => console.log("database host : ", res.connection.host)).catch(err => console.log("error : ", err))
    console.log('listening on port 5000')
});