"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const otp_cron_1 = __importDefault(require("./otp-cron"));
exports.default = () => {
    node_cron_1.default.schedule('*/2 * * * *', () => {
        (0, otp_cron_1.default)();
    });
};
