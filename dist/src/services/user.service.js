"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_handler_1 = __importDefault(require("../utils/handlers/error.handler"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const otp_1 = __importDefault(require("../utils/otp"));
const moment_1 = __importDefault(require("moment"));
const email_1 = require("../utils/email");
class UserService {
    constructor() {
        this.users = prisma_1.default.user;
        this.otps = prisma_1.default.otp;
    }
    isRegisteredUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.users.findUnique({
                where: {
                    email
                }
            });
        });
    }
    createUser(name, email, password, zipCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEmail = yield this.isRegisteredUser(email);
            if (existingEmail)
                throw new error_handler_1.default(409, `user with email ${email} already exist`);
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const { otp, expiresAt } = (0, otp_1.default)();
            return yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const newUser = yield tx.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                        zipCode
                    }
                });
                yield tx.otp.create({
                    data: {
                        userId: newUser.id,
                        otp,
                        expiresAt
                    }
                });
            }));
        });
    }
    // public async verifyUser(email: string, otp: string) {
    //   const registeredUser = await this.isRegisteredUser(email)
    //   if (!registeredUser) throw new HttpException(400, `user with email ${email} is not registered`);
    //   if (registeredUser.isVerified) {
    //     throw new HttpException(400, `user already verified`);
    //   }
    //   const userOtpData = await this.otps.findUnique({ where: { userId: registeredUser.id } });
    //   const now = moment();
    //   if (userOtpData?.otp !== otp) {
    //     throw new HttpException(400, 'invalid verification code')
    //   } else if (now.isAfter(userOtpData.expiresAt)) {
    //     throw new HttpException(400, 'verification code expired')
    //   }
    //   await this.users.update({ where: { id: registeredUser.id }, data: { isVerified: true } })
    // }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.isRegisteredUser(email);
            if (!existingUser)
                throw new error_handler_1.default(409, 'invalid email/password');
            const isValidPassword = yield bcrypt_1.default.compare(password, existingUser.password);
            if (!isValidPassword)
                throw new error_handler_1.default(401, 'invalid email/password');
            return existingUser;
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const registeredUser = yield this.isRegisteredUser(email);
            if (!registeredUser)
                throw new error_handler_1.default(409, `Email ${email} is not registered`);
            const { otp, expiresAt } = (0, otp_1.default)();
            // create otp record
            yield this.otps.create({ data: { userId: registeredUser.id, otp, expiresAt } });
            // send otp
            (0, email_1.sendVerificationEmail)(registeredUser.name, email, otp);
        });
    }
    resendResetOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const registeredUser = yield this.isRegisteredUser(email);
            if (!registeredUser)
                throw new error_handler_1.default(400, `user with email ${email} is not registered`);
            // if (registeredUser.isVerified) {
            //   throw new HttpException(400, `user already verified`);
            // }
            const { otp, expiresAt } = (0, otp_1.default)();
            // create otp record
            yield this.otps.create({ data: { userId: registeredUser.id, otp, expiresAt } });
            // send otp
            (0, email_1.sendVerificationEmail)(registeredUser.name, email, otp);
        });
    }
    resetPassword(email, otp, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const registeredUser = yield this.isRegisteredUser(email);
            if (!registeredUser)
                throw new error_handler_1.default(409, `Email ${email} is not registered`);
            const userOtpData = yield this.otps.findUnique({ where: { userId: registeredUser.id } });
            if (!userOtpData) {
                throw new error_handler_1.default(400, 'otp code expired');
            }
            const now = (0, moment_1.default)();
            if ((userOtpData === null || userOtpData === void 0 ? void 0 : userOtpData.otp) !== otp) {
                throw new error_handler_1.default(400, 'invalid otp code');
            }
            else if (now.isAfter(userOtpData.expiresAt)) {
                throw new error_handler_1.default(400, 'otp code expired');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield this.users.update({ where: { id: registeredUser.id }, data: { password: hashedPassword } });
        });
    }
    saveNotificationToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.users.update({
                where: {
                    id: userId,
                },
                data: {
                    notificationToken: token
                }
            });
        });
    }
}
exports.default = UserService;
