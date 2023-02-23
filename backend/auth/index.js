const express = require('express')
const app = express()
const env = require('dotenv')
const { json } = require('express')
const { router } = require('./router/v1/router')
const port = process.env.PORT || 2020
env.config()



app.use(json())
app.use(router)


app.listen(port,()=>{
    console.log('listening to port 2020 .... ');
})