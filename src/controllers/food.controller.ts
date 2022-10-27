import { Request, Response, NextFunction } from "express";
import FoodService from "../services/food.service";
import { AuthRequest } from "interfaces/auth.interface";
import { FoodItem } from "interfaces/food.interface";
import { publicResponse } from "../helpers/food.helper";
import HttpException from "../utils/handlers/error.handler";

export default class FoodController {
  private FoodService = new FoodService();

  public getStorages = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id: userId } = req.user;
    try {
      const storages = await this.FoodService.getStorages(userId);
      const response = publicResponse(storages)
      return res
        .status(200)
        .json({
          status: 'success',
          data: response
        })
    } catch (error) {
      next(error)
    }
  }

  public getStorageFoods = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id: userId } = req.user;
    const { title } = req.params;
    let orderData;
    if (req.query.sort === undefined) {
      orderData = [{
        createdAt: 'desc'
      }]
    }
    if (req.query.sort === 'alphabetically') {
      orderData = [
        {
          name: 'asc'
        }
      ]
    }
    if (req.query.sort === 'expiry_date') {
      orderData = [
        {
          expiryDate: 'asc'
        }
      ]
    }
    try {
      const foods = await this.FoodService.getStorageFoods(userId, title, orderData)
      return res
        .status(200)
        .json({
          status: 'success',
          data: foods
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
    // const acceptedQueryParams: string[] = ['alphabetically', 'expiry_date'];

    // if (req.query.sort && !acceptedQueryParams.includes(query.sort)) {
    //   throw new HttpException(409, 'Invalid query param')
    // }

    let orderData;
    if (req.query.sort === undefined) {
      orderData = [{
        createdAt: 'desc'
      }]
    }
    if (req.query.sort === 'alphabetically') {
      orderData = [
        {
          name: 'asc'
        }
      ]
    }
    if (req.query.sort === 'expiry_date') {
      orderData = [
        {
          expiryDate: 'asc'
        }
      ]
    }
    try {
      const data = await this.FoodService.getAllFoods(userId, orderData);
      return res
        .status(200)
        .json({
          status: 'success',
          data
        })
    } catch (error) {
      next(error)
    }
  }

  public updateFood = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id: userId } = req.user;
    const { id: foodId } = req.params;
    try {
      await this.FoodService.updateFood(userId, foodId, req.body);
      return res
        .status(200)
        .json({
          status: 'success',
          message: 'update successful'
        })
    } catch (error) {
      next(error)
    }
  }

  public deleteFood = async (req: AuthRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const { id: userId } = req.user;
    const { id: foodId } = req.params;
    try {
      await this.FoodService.deleteFood(userId, foodId);
      return res
        .status(200)
        .json({
          status: 'success',
          message: 'delete successful'
        })
    } catch (error) {
      next(error)
    }
  }
}