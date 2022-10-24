"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const health_route_1 = __importDefault(require("./routes/health.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const food_route_1 = __importDefault(require("./routes/food.route"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const app = new app_1.default([
    new health_route_1.default(),
    new user_route_1.default(),
    new food_route_1.default()
]);
app.listen();
