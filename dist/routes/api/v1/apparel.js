"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apparel_1 = require("../../../controller/apparel");
const router = express_1.default.Router();
router.get("/update", apparel_1.singleUpdate);
exports.default = router;
