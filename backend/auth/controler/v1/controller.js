const {loginService} = require('../../services/services')

const login = (req,res)=>{
    let token = loginService(req.body)
    res.status(200).send({token})
}

const signup = (req,res)=>{

}


module.exports = {login,signup}