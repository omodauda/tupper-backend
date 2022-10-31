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
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const schedules_1 = __importDefault(require("./schedules"));
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 4000;
        this.env = process.env.NODE_ENV || 'development';
        this.googleKey = process.env['GOOGLE_APP_CREDENTIALS'] || '';
        // this.serviceAccount = JSON.parse(this.googleKey)
        this.serviceAccount = {
            "type": process.env.type,
            "project_id": process.env.project_id,
            "private_key_id": process.env.private_key_id,
            "private_key": process.env.private_key,
            "client_email": process.env.client_email,
            "client_id": process.env.client_id,
            "auth_uri": process.env.auth_uri,
            "token_uri": process.env.token_uri,
            "auth_provider_x509_cert_url": process.env.auth_provider,
            "client_x509_cert_url": process.env.client_cert_url,
        };
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        this.initializeSchedules();
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(this.serviceAccount)
        });
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
