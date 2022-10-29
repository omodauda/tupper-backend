import { Request, Response, NextFunction } from "express";
import FoodService from "../services/food.service";
import { AuthRequest } from "interfaces/auth.interface";
import { FoodItem } from "interfaces/food.interface";
import { publicResponse } from "../helpers/food.helper";
import HttpException from "../utils/handlers/error.handler";
import moment from "moment";

export default class FoodController {
  private FoodService = new FoodService();

  private sortFoodData = async (data: FoodItem[]) => {
    let expired = <any>[];
    let soon = <any>[];
    let week = <any>[];
    let later = <any>[];
    const today = moment();
    data.map((food: FoodItem) => {
      const { expiryDate } = food;
      const value = moment(expiryDate).diff(today, 'days');
      if (value <= 0) {
        expired.push(food)
      } else if (value < 7) {
        soon.push(food);
      } else if (value === 7) {
        week.push(food);
      } else {
        later.push(food);
      }
    })
    const result = [
      {
        title: 'Expired',
        data: expired,
      },
      {
        title: 'Expires soon',
        data: soon,
      },
      {
        title: 'Expires in a week',
        data: week,
      },
      {
        title: 'Expires later',
        data: later,
      },
    ];
    return result;
  }

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
      const foods = await this.FoodService.getStorageFoods(userId, title, orderData);
      const sortedData = await this.sortFoodData(foods)
      return res
        .status(200)
        .json({
          status: 'success',
          data: sortedData
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
      // sort food based on expiryDate into expiresSoon, in a week, later
      const sortedData = await this.sortFoodData(data)
      return res
        .status(200)
        .json({
          status: 'success',
          data: sortedData
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