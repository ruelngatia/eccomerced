const express = require('express')
const { router } = require('./router/v1/router')
const env = require('dotenv')
env.config()

const app = express()
app.use(router)


app.listen(process.env.PORT||3000,()=>{
    console.log('product running on 3000...');
})