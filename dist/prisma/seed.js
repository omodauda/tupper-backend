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
const prisma_1 = __importDefault(require("../src/lib/prisma"));
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma_1.default.storage.upsert({
            where: { title: 'Fridge' },
            update: {},
            create: {
                title: 'Fridge',
                logo: 'https://res.cloudinary.com/omodauda/image/upload/v1666562707/tupper/fridge_j84rs0.png',
            }
        });
        yield prisma_1.default.storage.upsert({
            where: { title: 'Pantry' },
            update: {},
            create: {
                title: 'Pantry',
                logo: 'https://res.cloudinary.com/omodauda/image/upload/v1666562717/tupper/pantry_y411wd.png',
            }
        });
        yield prisma_1.default.storage.upsert({
            where: { title: 'Freezer' },
            update: {},
            create: {
                title: 'Freezer',
                logo: 'https://res.cloudinary.com/omodauda/image/upload/v1666562717/tupper/freezer_edpj58.png',
            }
        });
    });
}
seed()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma_1.default.$disconnect();
    process.exit(1);
}));
