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
const moment_1 = __importDefault(require("moment"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const send_notification_1 = __importDefault(require("../utils/send.notification"));
function notifyUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const today = (0, moment_1.default)();
        const expiredFood = yield prisma_1.default.foodItem.findMany({
            where: {
                expiryDate: {
                    equals: today.format('YYYY-MM-DD').toLocaleString(),
                }
            }
        });
        expiredFood.forEach((food) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                userId: food.userId,
                title: 'Food expired',
                body: `${food.quantity} ${food.name} in your inventory has expired`
            };
            yield (0, send_notification_1.default)(data);
        }));
    });
}
exports.default = notifyUser;
