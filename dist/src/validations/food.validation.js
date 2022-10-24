"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFoodValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addFoodValidation = joi_1.default.object({
    storageId: joi_1.default.string()
        .min(36)
        .max(36)
        .required()
        .messages({
        'string.empty': 'storage id cannot be an empty field',
        'string.min': 'storage id should be minimum of 36 characters length',
        'string.max': 'storage id should not be more than 36 characters length',
        'any.required': 'storage id is required'
    }),
    name: joi_1.default.string()
        .required()
        .messages({
        'string.empty': 'name cannot be an empty field',
        'any.required': 'name is required'
    }),
    quantity: joi_1.default.number()
        .required()
        .integer()
        .positive()
        .messages({
        'number.base': "quantity must be a number",
        'any.required': 'quantity is required',
        'number.positive': 'quantity should be a positive number',
        'number.integer': 'quantity should be an integer'
    }),
    createdDate: joi_1.default.date()
        .required()
        .messages({
        'date.base': 'created date must be a valid date',
        'any.required': 'created date is required'
    }),
    expiryDate: joi_1.default.date()
        .required()
        .messages({
        'date.base': 'expiry date must be a valid date',
        'any.required': 'expiry date is required'
    })
});
