const {exec} = require('../dbHelper/dbHelper')
const loginService = async(user)=>{
    let result = await exec('signupUser',user)
    console.log(result)
    return 'the token'
}

module.exports = { loginService}