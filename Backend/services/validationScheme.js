const Joi = require('joi');

const registerValidation = Joi.object({
    
    fullName: Joi.string().min(3).max(30).required(), 
    email: Joi.string().email().required(),
    dob: Joi.date().iso().required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(8).required(),
    
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    .messages({ 'any.only': 'Passwords must match' }),

    agreement: Joi.boolean().valid(true).required()
    .messages({ 'any.only': 'You must accept the terms' })
});

const loginValidation  = Joi.object({

    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(8).required(),
    remember: Joi.boolean().optional()
})

module.exports = {registerValidation,loginValidation};