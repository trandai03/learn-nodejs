// const express = require('express');
// const cors = require('cors');
import express from 'express'
import cors from 'cors'
import initRoutes from './src/routers'
require('./connnetion_database')
require('dotenv').config

const app = express()
    app.use(cors({
        origin: process.env.CLIENT_URL,
        methods:['GET','POST','PUT','DELETE']
    }))

// Đọc data gửi lên
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

initRoutes(app)

const PORT = process.env.PORT || 8888

const listeners = app.listen(PORT, () => {
    console.log("Sever is running on port" + listeners.address().port);
})