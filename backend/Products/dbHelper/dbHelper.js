const mssql = require('mssql')
const {config} = require('../dbConfig/dbConfig')

class DBHelper{

    constructor(){
        this.connectionPool = this.createConnection()
    }

    async createConnection(){
        try{
            let pool = await mssql.connect(config)
            return pool
        }catch(error){
            throw error
        }
    }

    createRequest(request,data = {}){
        let keys = Object.keys(data)
        keys.forEach((key)=>{
            request.input(key,data[key])
        })
        return request;
    }

    async exec(procedure, data = {}){
        try {
            let request = await (await this.connectionPool).request()
            request = this.createRequest(request,data)
            let result = await request.execute(procedure)
            return result
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async query(querString){
        try {
            let result = await (await this.connectionPool).query(querString)
            return result
        } catch (error) {
            console.log(error);
        }
    }

}

const dbHelper = new DBHelper()

module.exports = {
    dbHelper: dbHelper
}