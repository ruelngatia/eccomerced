const mssql = require('mssql')
const {config} = require('../dbConfig/dbConfig')


class DBhelper {

    constructor(){
        this.conectionPool = getConnectionPool()
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
        let request = await ( await this.conectionPool().request())
        request = this.createRequest(request,data)
        let result = request.execute(procedure)
        return result
       } catch (error) {
         throw Error(error)
       }
    }

    async query(query){
        try {
            let result = await (await this.pool).query(query)
            return result
        } catch (error) {
            console.log(error);
        }
    }

}

const dbhelper = new DBhelper();
module.export = {
    exec: dbhelper.exec(),
    query: dbhelper.query()
}