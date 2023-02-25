const {loginService} = require('../../services/services')
const {signupService} = require('../../services/services')
const {loginSchema} = require('../../joi/loginSchema')
const {signupSchema} = require('../../joi/signupSchema')

const login = async(req,res)=>{

    const {error, value} = loginSchema.validate(req.body)
    if(error){
        return res.status(403).send({error: error.message})
    }

    try {
        let token = await loginService(req.body)
        res.status(200).send({token})
    } catch (error) {
        res.status(500).send({mesage: 'internal sever error'})
    }
}

const signup = async (req,res)=>{
    const {error, value} = signupSchema.validate(req.body)
    if(error){
        return res.status(403).send({error})
    }

    try {
        let message = await signupService(req.body)
        if(message.error){
           return  res.status(403).send(message) 
        }
        res.status(200).send(message)
    } catch (error) {
        res.status(500).send({mesage: 'internal sever error'})
        console.log(error);
    }

}


module.exports = {login,signup}