const joi = require('joi')

const signupSchema = joi.object({
    first_name: joi.string()
                    .min(3)
                    .max(15),
    second_name: joi.string()
                    .min(3)
                    .max(15), 
    last_name: joi.string()
                    .min(3)
                    .max(15),                
    email: joi.string()
                .email(),
    role: joi.any()
            .valid('seller','normal','admin'),
    username: joi.string()
                .alphanum()
                .min(3)
                .max(15),
    password: joi.string()
                .alphanum()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    
    
})

module.exports = {
    signupSchema
}