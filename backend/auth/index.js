const express = require('express')
const app = express()
const env = require('dotenv')
env.config()
const { json } = require('express')
const { router } = require('./router/v1/router')
const port = process.env.PORT || 2020



app.use(json())
app.use(router)


app.listen(port,()=>{
    console.log('listening to port 2020 .... cheers');
})