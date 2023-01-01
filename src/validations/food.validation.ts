import Joi from "joi";

export const addFoodValidation = Joi.object({
  storageId: Joi.string()
    .min(36)
    .max(36)
    .required()
    .messages({
      'string.empty': 'storage id cannot be an empty field',
      'string.min': 'storage id should be minimum of 36 characters length',
      'string.max': 'storage id should not be more than 36 characters length',
      'any.required': 'storage id is required'
    }),
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'name cannot be an empty field',
      'any.required': 'name is required'
    }),
  quantity: Joi.number()
    .required()
    .integer()
    .positive()
    .messages({
      'number.base': "quantity must be a number",
      'any.required': 'quantity is required',
      'number.positive': 'quantity should be a positive number',
      'number.integer': 'quantity should be an integer'
    }),
  createdDate: Joi.date()
    .required()
    .messages({
      'date.base': 'created date must be a valid date',
      'any.required': 'created date is required'
    }),
  expiryDate: Joi.date()
    .required()
    .messages({
      'date.base': 'expiry date must be a valid date',
      'any.required': 'expiry date is required'
    })
})

export const updateFoodValidation = Joi.object({
  storageId: Joi.string()
    .min(36)
    .max(36)
    .messages({
      'string.empty': 'storage id cannot be an empty field',
      'string.min': 'storage id should be minimum of 36 characters length',
      'string.max': 'storage id should not be more than 36 characters length',
    }),
  name: Joi.string()
    .messages({
      'string.empty': 'name cannot be an empty field',
    }),
  quantity: Joi.number()
    .integer()
    .positive()
    .messages({
      'number.base': "quantity must be a number",
      'number.positive': 'quantity should be a positive number',
      'number.integer': 'quantity should be an integer'
    }),
  expiryDate: Joi.date()
    .messages({
      'date.base': 'expiry date must be a valid date',
    })
})