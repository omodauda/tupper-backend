import { Request, Response, NextFunction } from "express";
import FoodService from "../services/food.service";

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
}