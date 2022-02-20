const Joi = require('joi');
const JoiForPhone = Joi.extend(require('joi-phone-number'));

const schemaAdd = Joi.object({
  name: Joi.string()
    .pattern(/[ a-zA-Z]+/)
    .min(3)
    .max(50)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: JoiForPhone.string().phoneNumber().required(),
});

const schemaEdit = Joi.object({
  name: Joi.string()
    .pattern(/[ a-zA-Z]+/)
    .min(3)
    .max(50),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: JoiForPhone.string().phoneNumber(),
});

module.exports = {
  schemaAdd,
  schemaEdit,
};
