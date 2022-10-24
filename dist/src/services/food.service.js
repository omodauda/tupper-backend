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
    getStorages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storage.findMany();
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
    getAllFoods(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.food.findMany({
                where: { userId }
            });
        });
    }
}
exports.default = FoodService;