"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const schedules_1 = __importDefault(require("./schedules"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 4000;
        this.env = process.env.NODE_ENV || 'development';
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        this.initializeSchedules();
    }
    initializeMiddleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, hpp_1.default)());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/api', route.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    initializeSchedules() {
        (0, schedules_1.default)();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`);
        });
    }
}
exports.default = App;
