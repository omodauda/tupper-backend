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
    .min(8)
    .max(20)
    .required()
    .messages({
      'string.empty': 'password cannot be an empty field',
      'string.min': 'password should be minimum of 5 characters length',
      'string.max': 'password should not be more than 20 characters length',
      'any.required': 'password is required',
    }),
  name: Joi.string()
    .required()
    .messages({
      'string.empty': 'name cannot be an empty field',
      'any.required': 'name is required'
    }),
  zipCode: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.empty': 'zip code cannot be an empty field',
      'string.min': 'zip code should be minimum of 5 characters length',
      'any.required': 'zip code is required'
    })
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

const verifyUserValidation = Joi.object({
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
  otp: Joi.string()
    .min(4)
    .max(4)
    .required()
    .messages({
      'string.empty': 'otp cannot be an empty field',
      'string.min': 'otp should be minimum of 5 characters length',
      'string.max': 'otp should not be more than 4 characters length',
      'any.required': 'otp is required',
    })
})

const resendVerifyOtp = Joi.object({
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
})

const resetPasswordValidation = Joi.object({
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
  otp: Joi.string()
    .length(4)
    .required()
    .messages({
      'string.empty': 'otp cannot be an empty field',
      'string.length': 'otp should be 4 characters length',
      'any.required': 'otp is required',
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

const saveNotificationTokenValidation = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'string.empty': 'token cannot be empty',
      'any.required': 'token is required',
    })
})

export {
  signUpValidation,
  loginValidation,
  verifyUserValidation,
  resendVerifyOtp,
  resetPasswordValidation,
  saveNotificationTokenValidation
}