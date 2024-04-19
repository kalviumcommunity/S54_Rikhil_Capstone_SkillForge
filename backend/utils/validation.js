const Joi = require("joi");

exports.userValidation = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  institution: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  contact: Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.number().integer().min(1111111111).max(9999999999).required(),
  }).required(),
});

exports.companyValidation = Joi.object({
  name: Joi.string().required(),
  orgname: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  contact: Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
  }).required(),
  website: Joi.string()
    .regex(
      /^https:\/\/(?:www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]*)?$/
    )
    .required(),
}).required();

exports.taskValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  bounty: Joi.number().required(),
});

exports.institutionValidation = Joi.object({
  name: Joi.string().required(),
  instname: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  description: Joi.string().required(),
  logo: Joi.string().required(),
  contact: Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.number().integer(),
  }).required(),
});

exports.eventValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  volunteers: Joi.number().required(),
  institution: Joi.string().required(),
});
