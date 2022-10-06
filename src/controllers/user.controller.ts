import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

export default class UserController {
  private UserService = new UserService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, email, password } = req.body;
      await this.UserService.createUser(name, email, password);
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
}