const nodemailer = require('nodemailer')
const ejs = require('ejs')
const env = require('dotenv')
const fs = require('fs')
const { log } = require('console')
env.config('../')

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const subject = 'New Account created'

const mailNewUser = (data)=>{
    let uri = __dirname + '/templates/newUser/newUser.ejs'
    const template = ejs.compile(fs.readFileSync(uri, 'utf8'))
    let html = template(data)

    let mailOptions = {
        from: process.env.EMAIL,
        to: 'ruelkiretai@gmail.com',
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
        }else{
            // console.log(info);
        }
    })
}


module.exports = {
    mailNewUser
}

