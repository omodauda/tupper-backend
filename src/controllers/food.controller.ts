import { Request, Response, NextFunction } from "express";
import FoodService from "../services/food.service";
import { AuthRequest } from "interfaces/auth.interface";
import { FoodItem } from "interfaces/food.interface";

export default class FoodController {
  private FoodService = new FoodService();

  public getStorages = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const storages = await this.FoodService.getStorages();
      return res
        .status(200)
        .json({
          status: 'success',
          data: storages
        })
    } catch (error) {
      next(error)
    }
  }

  public addFood = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const foodItemData: FoodItem = req.body;
    const { id: userId } = req.user;
    try {
      const food = await this.FoodService.addFood(userId, foodItemData);
      return res
        .status(201)
        .json({
          status: 'success',
          message: 'Food item added successfully',
          data: food
        })
    } catch (error) {
      next(error)
    }
  }

  public getUserFoods = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id: userId } = req.user;
    try {
      const data = await this.FoodService.getAllFoods(userId);
      return res
        .status(201)
        .json({
          status: 'success',
          data
        })
    } catch (error) {
      next(error)
    }
  }
}