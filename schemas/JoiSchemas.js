const Joi = require('joi');

const validateUser = Joi.object().keys({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required().messages({
    'string.min': '"password" length must be 6 characters long',
  }),
  image: Joi.string(),
});

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateCategory = Joi.object({
  name: Joi.string().required(),
});

const validatePost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).required(),
});

module.exports = {
  validateUser,
  validateLogin,
  validateCategory,
  validatePost,
};