import { Router } from "express";
import FoodController from "../controllers/food.controller";
import Route from "../interfaces/route.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { addFoodValidation, updateFoodValidation } from "../validations/food.validation";
import validationMiddleware from "../middlewares/validation.middleware";

export default class FoodRoute implements Route {
  public path = '/food';
  public router = Router();
  private FoodController = new FoodController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/storages`)
      .get(authMiddleware, this.FoodController.getStorages);

    this.router
      .route(`${this.path}`)
      .post(authMiddleware, validationMiddleware(addFoodValidation), this.FoodController.addFood)
      .get(authMiddleware, this.FoodController.getUserFoods)

    this.router
      .route(`${this.path}/storages/:title`)
      .get(authMiddleware, this.FoodController.getStorageFoods)

    this.router
      .route(`${this.path}/:id`)
      .patch(authMiddleware, validationMiddleware(updateFoodValidation), this.FoodController.updateFood)
      .delete(authMiddleware, this.FoodController.deleteFood);
  }
}