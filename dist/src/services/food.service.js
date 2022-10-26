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
const error_handler_1 = __importDefault(require("../utils/handlers/error.handler"));
const prisma_1 = __importDefault(require("../lib/prisma"));
class FoodService {
    constructor() {
        this.storage = prisma_1.default.storage;
        this.food = prisma_1.default.foodItem;
    }
    existingStorage(storageTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storage.findUnique({ where: { title: storageTitle } });
        });
    }
    getStorages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storage.findMany({
                include: {
                    items: {
                        where: {
                            userId
                        },
                    }
                }
            });
        });
    }
    getStorageFoods(userId, storageTitle, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingStorage = yield this.existingStorage(storageTitle);
            if (!existingStorage) {
                throw new error_handler_1.default(409, `invalid storage`);
            }
            return yield this.food.findMany({
                where: {
                    userId,
                    storageId: existingStorage.id,
                },
                orderBy: orderData
            });
        });
    }
    addFood(userId, foodItemData) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if storage exists
            const storage = yield this.storage.findUnique({ where: { id: foodItemData.storageId } });
            if (!storage) {
                throw new error_handler_1.default(409, 'Invalid storage');
            }
            return yield this.food.create({
                data: {
                    userId,
                    storageId: foodItemData.storageId,
                    name: foodItemData.name,
                    quantity: foodItemData.quantity,
                    createdDate: foodItemData.createdDate,
                    expiryDate: foodItemData.expiryDate
                }
            });
        });
    }
    getAllFoods(userId, orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.food.findMany({
                where: { userId },
                orderBy: orderData
            });
        });
    }
    updateFood(userId, foodId, update) {
        return __awaiter(this, void 0, void 0, function* () {
            // check if food exist
            const existingFood = yield this.food.findUnique({ where: { id: foodId } });
            if (!existingFood) {
                throw new error_handler_1.default(409, 'Food item does not exist');
            }
            // check if food belongs to user
            if (existingFood.userId !== userId) {
                throw new error_handler_1.default(409, 'Unauthorized');
            }
            return yield this.food.update({ where: { id: foodId }, data: update });
        });
    }
}
exports.default = FoodService;
