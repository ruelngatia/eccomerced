const mssql = require('mssql')
const {config} = require('../dbConfig/dbConfig')


class DBhelper {

    constructor(){
        this.conectionPool = this.getConnectionPool()
    }

    async getConnectionPool(){
        try {
            let pool = await mssql.connect(config)
            return pool
        } catch (error) {
            
            throw Error(error)        
        }
    }

    createRequest(request,data = {}){
        let keys = Object.keys(data)
        keys.map((key)=>{
            request.input(key,data[key])
        })
        return request
    }

    async exec(procedure, data = {}){
       try {
            let request = await (await this.conectionPool).request()
            request = this.createRequest(request,data)
            let result = await request.execute(procedure)
            return result
       } catch (error) {
            throw Error(error)
       }
    }

    async query(querString){
        try {
            let result = await (await this.conectionPool).query(querString)
            return result
        } catch (error) {
            console.log(error);
        }
    }

}

const dbhelper = new DBhelper();

module.exports = {
    dbhelper: dbhelper
}