"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const otp_cron_1 = __importDefault(require("./otp-cron"));
const notification_1 = __importDefault(require("./notification"));
exports.default = () => {
    node_cron_1.default.schedule('*/2 * * * *', () => {
        (0, otp_cron_1.default)();
    });
    node_cron_1.default.schedule('0 8 * * *', () => {
        (0, notification_1.default)();
    });
};
