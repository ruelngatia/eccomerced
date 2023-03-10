const env = require('dotenv')
env.config()


const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.SERVER,
    port: parseInt(process.env.MSSQL_PORT),
    parseJSON: true,
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