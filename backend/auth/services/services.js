const amqp = require('amqplib')
const {dbhelper} = require('../dbHelper/dbHelper')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()

const uri = 'amqp://localhost:5672'
const exchangeName = 'emailExchange';
const loginService = async(user)=>{
    try {
        let result = await dbhelper.exec('loginUser',user)
        let payload = result.recordsets.flat(2)
        console.log(payload);
        if(result.rowsAffected[0] > 0){
            let token = jwt.sign(payload[0],process.env.SECRET,{expiresIn: '1h'})
            return token
        }else{
            return {message: 'wrong user or password'}
        }
    } catch (error) {
        console.log(error);
        throw error
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
            let userName =  user.first_name + ' ' + user.second_name
            let message = {
                name: userName
            }
            console.log(message);
            console.log(JSON.stringify(message));
            sendNotificationEMail(JSON.stringify(message))
            return {message: 'user added successfully'}
        }
    } catch (error) {
        console.log(error);
    }
}

const sendNotificationEMail = async(name)=>{
    const connection = await amqp.connect(uri)
    const channel = await connection.createChannel()

    await channel.assertExchange(exchangeName,'topic',{durable: true})
    channel.publish(exchangeName,'email.newUser',Buffer.from(name))

}

module.exports = { loginService,signupService}