"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const axios_1 = __importDefault(require("axios"));
const sendVerificationEmail = (name, receiver, otp) => {
    const subject = 'Verification OTP';
    const body = `Your one-time code is: ${otp}`;
    axios_1.default.post('https://api.sendchamp.com/api/v1/email/send', {
        from: { email: 'no-reply@tupper.com', name: 'Tupper App' },
        to: [{ email: receiver, name: name }],
        message_body: { type: "text/html", value: body },
        subject
    }, {
        headers: {
            Authorization: `Bearer ${process.env.SENDCHAMP_KEY}`,
            'Content-Type': 'application/json',
        }
    });
};
exports.sendVerificationEmail = sendVerificationEmail;
