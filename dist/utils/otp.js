"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const otp_generator_1 = __importDefault(require("otp-generator"));
function generateOtp() {
    const otp = otp_generator_1.default.generate(5, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    // const expiresAt = moment().add(6, 'minutes').toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    return {
        otp,
        expiresAt
    };
}
exports.default = generateOtp;
