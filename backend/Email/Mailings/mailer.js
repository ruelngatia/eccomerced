const nodemailer = require('nodemailer')
const ejs = require('ejs')
const env = require('dotenv')
const fs = require('fs')
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
    const template = ejs.compile(fs.readFileSync(__dirname + '/templates/newUser/newUser.ejs', 'utf8'))
    let html = template({name: data.name})

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
            console.log(info);
        }
    })
}


module.exports = {
    mailNewUser
}

