const Joi = require("joi");

// Схема для валідації
const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
  contactsAddSchema,
};
