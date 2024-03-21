const Joi = require("joi");

exports.userValidation = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    institution: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required(),
})