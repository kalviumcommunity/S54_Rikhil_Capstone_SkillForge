const Joi = require("joi");

exports.userValidation = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  institution: Joi.string().required(),
  password: Joi.string().required(),
  contact: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.number().integer().min(1111111111).max(9999999999).required(),
  }).required(),
});

exports.taskValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  bounty: Joi.number().required()
});