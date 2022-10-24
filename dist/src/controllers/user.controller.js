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
const user_service_1 = __importDefault(require("../services/user.service"));
const token_1 = require("../utils/token");
class UserController {
    constructor() {
        this.UserService = new user_service_1.default();
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, zipCode } = req.body;
                yield this.UserService.createUser(name, email, password, zipCode);
                return res
                    .status(201)
                    .json({
                    status: 'success',
                    message: 'user successfully registered'
                });
            }
            catch (error) {
                next(error);
            }
        });
        // public verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        //   try {
        //     const { email, otp } = req.body;
        //     await this.UserService.verifyUser(email, otp);
        //     return res
        //       .status(200)
        //       .json({
        //         status: 'success',
        //         message: 'user verified successfully'
        //       })
        //   } catch (error) {
        //     next(error)
        //   }
        // }
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.UserService.login(email, password);
                const { token } = (0, token_1.signToken)(user);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    message: 'user login successful',
                    token,
                    data: user
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.forgetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.UserService.forgetPassword(email);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    message: 'please check your email for a reset otp',
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.resendResetOtp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield this.UserService.resendResetOtp(email);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    message: 'verification otp sent successfully'
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp, password } = req.body;
                yield this.UserService.resetPassword(email, otp, password);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    message: 'password reset successful',
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
