import Joi from 'joi';

const signUpValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.empty': 'email cannot be an empty field',
      'string.email': 'please enter a valid email address',
      'any.required': 'email is required'
    }),
  password: Joi.string()
    .min(5)
    .max(20)
    .required()
    .messages({
      'string.empty': 'password cannot be an empty field',
      'string.min': 'password should be minimum of 5 characters length',
      'string.max': 'password should not be more than 20 characters length',
      'any.required': 'password is required',
    }),
  name: Joi.string()
    .min(5)
    .required()
    .pattern(/(\w.+\s).+/)
    .messages({
      'string.empty': 'name cannot be an empty field',
      'string.min': 'name should be minimum of 5 characters length',
      'string.pattern.base': 'full name is required',
      'any.required': 'name is required'
    }),
});

const loginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.empty': 'email cannot be an empty field',
      'string.email': 'please enter a valid email address',
      'any.required': 'email is required'
    }),
  password: Joi.string()
    .min(5)
    .max(20)
    .required()
    .messages({
      'string.empty': 'password cannot be an empty field',
      'string.min': 'password should be minimum of 5 characters length',
      'string.max': 'password should not be more than 20 characters length',
      'any.required': 'password is required',
    }),
})

export { signUpValidation, loginValidation }