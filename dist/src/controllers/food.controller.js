"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_service_1 = __importDefault(require("../services/food.service"));
const food_helper_1 = require("../helpers/food.helper");
class FoodController {
    constructor() {
        this.FoodService = new food_service_1.default();
        this.getStorages = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            try {
                const storages = yield this.FoodService.getStorages(userId);
                const response = (0, food_helper_1.publicResponse)(storages);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getStorageFoods = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const { title } = req.params;
            let orderData;
            if (req.query.sort === undefined) {
                orderData = [{
                        createdAt: 'desc'
                    }];
            }
            if (req.query.sort === 'alphabetically') {
                orderData = [
                    {
                        name: 'asc'
                    }
                ];
            }
            if (req.query.sort === 'expiry_date') {
                orderData = [
                    {
                        expiryDate: 'asc'
                    }
                ];
            }
            try {
                const foods = yield this.FoodService.getStorageFoods(userId, title, orderData);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    data: foods
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.addFood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const foodItemData = req.body;
            const { id: userId } = req.user;
            try {
                const food = yield this.FoodService.addFood(userId, foodItemData);
                return res
                    .status(201)
                    .json({
                    status: 'success',
                    message: 'Food item added successfully',
                    data: food
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserFoods = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            // const acceptedQueryParams: string[] = ['alphabetically', 'expiry_date'];
            // if (req.query.sort && !acceptedQueryParams.includes(query.sort)) {
            //   throw new HttpException(409, 'Invalid query param')
            // }
            let orderData;
            if (req.query.sort === undefined) {
                orderData = [{
                        createdAt: 'desc'
                    }];
            }
            if (req.query.sort === 'alphabetically') {
                orderData = [
                    {
                        name: 'asc'
                    }
                ];
            }
            if (req.query.sort === 'expiry_date') {
                orderData = [
                    {
                        expiryDate: 'asc'
                    }
                ];
            }
            try {
                const data = yield this.FoodService.getAllFoods(userId, orderData);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    data
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateFood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const { id: foodId } = req.params;
            try {
                yield this.FoodService.updateFood(userId, foodId, req.body);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    message: 'update successful'
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteFood = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id: userId } = req.user;
            const { id: foodId } = req.params;
            try {
                yield this.FoodService.deleteFood(userId, foodId);
                return res
                    .status(200)
                    .json({
                    status: 'success',
                    message: 'delete successful'
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = FoodController;
