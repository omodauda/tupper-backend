import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../interfaces/auth.interface";
import UserService from "../services/user.service";
import { signToken } from '../utils/token'

export default class UserController {
  private UserService = new UserService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, email, password, zipCode } = req.body;
      await this.UserService.createUser(name, email, password, zipCode);
      return res
        .status(201)
        .json({
          status: 'success',
          message: 'user successfully registered'
        })
    } catch (error) {
      next(error);
    }
  }

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

  public login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email, password } = req.body;
      const user: User = await this.UserService.login(email, password);
      const { token } = signToken(user);
      return res
        .status(200)
        .json({
          status: 'success',
          message: 'user login successful',
          token,
          data: user
        })
    } catch (error) {
      next(error)
    }
  }

  public forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email } = req.body;
      await this.UserService.forgetPassword(email);
      return res
        .status(200)
        .json({
          status: 'success',
          message: 'please check your email for a reset otp',
        })
    } catch (error) {
      next(error)
    }
  }

  public resendResetOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email } = req.body;
      await this.UserService.resendResetOtp(email)
      return res
        .status(200)
        .json({
          status: 'success',
          message: 'verification otp sent successfully'
        })
    } catch (error) {
      next(error)
    }
  }

  public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { email, otp, password } = req.body;
      await this.UserService.resetPassword(email, otp, password);
      return res
        .status(200)
        .json({
          status: 'success',
          message: 'password reset successful',
        })
    } catch (error) {
      next(error)
    }
  }

  public saveNotificationToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id: userId } = req.user;
    const { token } = req.body;
    try {
      await this.UserService.saveNotificationToken(userId, token)
      return res
        .status(200)
        .json({
          status: 'success',
          message: 'notification token updated'
        })
    } catch (error) {
      next(error)
    }
  }
}