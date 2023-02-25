const {dbhelper} = require('../dbHelper/dbHelper')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()

const loginService = async(user)=>{
    try {
        let result = await dbhelper.exec('loginUser',user)
        if(result.rowsAffected[0] > 0){
            let token = jwt.sign(result,process.env.SECRET,{expiresIn: '1h'})
            return token
        }else{
            return {message: 'wrong user or password'}
        }
    } catch (error) {
        console.log(error);
    }
}

const signupService = async(user)=>{
    try {
        let {username,email} = user
        let checkexistingUser = await dbhelper.exec('checkexistingEmailUsername',{username,email})

        if(checkexistingUser.recordset != undefined){
            return checkexistingUser.recordset[0]
        }
        let result = await dbhelper.exec('signupUser',user)
        
        if(result.returnValue == 0){
            return {message: 'user added successfully'}
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { loginService,signupService}