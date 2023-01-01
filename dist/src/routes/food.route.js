"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_controller_1 = __importDefault(require("../controllers/food.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const food_validation_1 = require("../validations/food.validation");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
class FoodRoute {
    constructor() {
        this.path = '/food';
        this.router = (0, express_1.Router)();
        this.FoodController = new food_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router
            .route(`${this.path}/storages`)
            .get(auth_middleware_1.authMiddleware, this.FoodController.getStorages);
        this.router
            .route(`${this.path}`)
            .post(auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(food_validation_1.addFoodValidation), this.FoodController.addFood)
            .get(auth_middleware_1.authMiddleware, this.FoodController.getUserFoods);
        this.router
            .route(`${this.path}/storages/:title`)
            .get(auth_middleware_1.authMiddleware, this.FoodController.getStorageFoods);
        this.router
            .route(`${this.path}/:id`)
            .patch(auth_middleware_1.authMiddleware, (0, validation_middleware_1.default)(food_validation_1.updateFoodValidation), this.FoodController.updateFood)
            .delete(auth_middleware_1.authMiddleware, this.FoodController.deleteFood);
    }
}
exports.default = FoodRoute;
