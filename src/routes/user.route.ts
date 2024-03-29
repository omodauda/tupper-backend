import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import UserController from "../controllers/user.controller";
import Route from "../interfaces/route.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import {
  signUpValidation,
  loginValidation,
  verifyUserValidation,
  resendVerifyOtp,
  resetPasswordValidation,
  saveNotificationTokenValidation
} from "../validations/user.validation";

export default class UserRoute implements Route {
  public path = '/user';
  public router = Router();
  private UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/signup`)
      .post(validationMiddleware(signUpValidation), this.UserController.signUp);

    this.router
      .route(`${this.path}/login`)
      .post(validationMiddleware(loginValidation), this.UserController.login);

    // this.router
    //   .route(`${this.path}/verify`)
    //   .post(validationMiddleware(verifyUserValidation), this.UserController.verifyUser);


    this.router
      .route(`${this.path}/forget-password`)
      .post(validationMiddleware(resendVerifyOtp), this.UserController.forgetPassword);

    this.router
      .route(`${this.path}/resend-otp`)
      .post(validationMiddleware(resendVerifyOtp), this.UserController.resendResetOtp);

    this.router
      .route(`${this.path}/reset-password`)
      .post(validationMiddleware(resetPasswordValidation), this.UserController.resetPassword)

    this.router
      .route(`${this.path}/save-token`)
      .post(
        validationMiddleware(saveNotificationTokenValidation),
        authMiddleware,
        this.UserController.saveNotificationToken
      );

    this.router
      .route(`${this.path}/remove-token`)
      .patch(authMiddleware, this.UserController.removeNotificationToken)
  }
}