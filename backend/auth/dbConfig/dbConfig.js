const mssql = require('mssql')
const env = require('dotenv')
env.config()


const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.SERVER,
    pool: {
        idleTimeoutMillis: 30000,
        max: 3,
        min: 0
    },
    options:{
        encrypt: false, 
        trustServerCertificate: false
    }
}

module.exports = {config}