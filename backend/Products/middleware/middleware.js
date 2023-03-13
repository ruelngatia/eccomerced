const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()

const sellerVerification = (req,res,next)=>{
    let token = req.headers.authorization?.split(' ')[1]
    console.log(req.body);
    jwt.verify(token,process.env.SECRET,(err,decode)=>{
        if(err){
            res.status(401).send({message:'unauthorised'})
        }
        req.body = {...req.body,user_id: decode.user_id}
        next()
    })
}

module.exports ={
    sellerVerification
}