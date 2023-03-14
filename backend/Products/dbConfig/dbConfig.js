const env = require('dotenv')
env.config('../')

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.SERVER,
    parseJSON: true,
    pool: {
        max: 10,
        min: 2,
        idleTimeoutMillis: 3000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
}

module.exports = {
    config
}