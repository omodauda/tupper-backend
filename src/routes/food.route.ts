import { Router } from "express";
import FoodController from "../controllers/food.controller";
import Route from "interfaces/route.interface";

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
      .get(this.FoodController.getStorages)
  }
}