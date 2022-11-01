"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const user_validation_1 = require("../validations/user.validation");
class UserRoute {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.UserController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(`${this.path}/signup`)
            .post((0, validation_middleware_1.default)(user_validation_1.signUpValidation), this.UserController.signUp);
        this.router
            .route(`${this.path}/login`)
            .post((0, validation_middleware_1.default)(user_validation_1.loginValidation), this.UserController.login);
        // this.router
        //   .route(`${this.path}/verify`)
        //   .post(validationMiddleware(verifyUserValidation), this.UserController.verifyUser);
        this.router
            .route(`${this.path}/forget-password`)
            .post((0, validation_middleware_1.default)(user_validation_1.resendVerifyOtp), this.UserController.forgetPassword);
        this.router
            .route(`${this.path}/resend-otp`)
            .post((0, validation_middleware_1.default)(user_validation_1.resendVerifyOtp), this.UserController.resendResetOtp);
        this.router
            .route(`${this.path}/reset-password`)
            .post((0, validation_middleware_1.default)(user_validation_1.resetPasswordValidation), this.UserController.resetPassword);
        this.router
            .route(`${this.path}/save-token`)
            .post((0, validation_middleware_1.default)(user_validation_1.saveNotificationTokenValidation), auth_middleware_1.authMiddleware, this.UserController.saveNotificationToken);
        this.router
            .route(`${this.path}/remove-token`)
            .patch(auth_middleware_1.authMiddleware, this.UserController.removeNotificationToken);
    }
}
exports.default = UserRoute;
