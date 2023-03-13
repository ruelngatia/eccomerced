const express = require('express')
const { router } = require('./router/v1/router')
const env = require('dotenv')
const { json } = require('express')
env.config()

const app = express()
app.use(json())
app.use(router)


app.listen(process.env.PORT||3000,()=>{
    console.log('products service running on 3000...');
})