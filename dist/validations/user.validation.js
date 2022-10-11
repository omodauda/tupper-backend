"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendVerifyOtp = exports.verifyUserValidation = exports.loginValidation = exports.signUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpValidation = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .min(5)
        .max(100)
        .required()
        .messages({
        'string.empty': 'email cannot be an empty field',
        'string.email': 'please enter a valid email address',
        'any.required': 'email is required'
    }),
    password: joi_1.default.string()
        .min(5)
        .max(20)
        .required()
        .messages({
        'string.empty': 'password cannot be an empty field',
        'string.min': 'password should be minimum of 5 characters length',
        'string.max': 'password should not be more than 20 characters length',
        'any.required': 'password is required',
    }),
    name: joi_1.default.string()
        .required()
        .pattern(/(\w.+\s).+/)
        .messages({
        'string.empty': 'name cannot be an empty field',
        'string.pattern.base': 'full name is required',
        'any.required': 'name is required'
    }),
    zipCode: joi_1.default.string()
        .min(5)
        .required()
        .messages({
        'string.empty': 'zip code cannot be an empty field',
        'string.min': 'zip code should be minimum of 5 characters length',
        'any.required': 'zip code is required'
    })
});
exports.signUpValidation = signUpValidation;
const loginValidation = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .min(5)
        .max(100)
        .required()
        .messages({
        'string.empty': 'email cannot be an empty field',
        'string.email': 'please enter a valid email address',
        'any.required': 'email is required'
    }),
    password: joi_1.default.string()
        .min(5)
        .max(20)
        .required()
        .messages({
        'string.empty': 'password cannot be an empty field',
        'string.min': 'password should be minimum of 5 characters length',
        'string.max': 'password should not be more than 20 characters length',
        'any.required': 'password is required',
    }),
});
exports.loginValidation = loginValidation;
const verifyUserValidation = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .min(5)
        .max(100)
        .required()
        .messages({
        'string.empty': 'email cannot be an empty field',
        'string.email': 'please enter a valid email address',
        'any.required': 'email is required'
    }),
    otp: joi_1.default.string()
        .min(4)
        .max(4)
        .required()
        .messages({
        'string.empty': 'otp cannot be an empty field',
        'string.min': 'otp should be minimum of 5 characters length',
        'string.max': 'otp should not be more than 4 characters length',
        'any.required': 'otp is required',
    })
});
exports.verifyUserValidation = verifyUserValidation;
const resendVerifyOtp = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2 })
        .min(5)
        .max(100)
        .required()
        .messages({
        'string.empty': 'email cannot be an empty field',
        'string.email': 'please enter a valid email address',
        'any.required': 'email is required'
    }),
});
exports.resendVerifyOtp = resendVerifyOtp;
