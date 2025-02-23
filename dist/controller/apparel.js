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
exports.singleUpdate = exports.ApparelSize = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
var ApparelSize;
(function (ApparelSize) {
    ApparelSize["XS"] = "XS";
    ApparelSize["S"] = "S";
    ApparelSize["M"] = "M";
    ApparelSize["L"] = "L";
    ApparelSize["XL"] = "XL";
    ApparelSize["XXL"] = "XXL";
})(ApparelSize || (exports.ApparelSize = ApparelSize = {}));
const singleUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.resolve(__dirname, "../store.jsx");
        const fileData = yield fs_1.promises.readFile(filePath, "utf8");
        const apparels = JSON.parse(fileData);
        return res.json(apparels);
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to read apparel data" });
    }
});
exports.singleUpdate = singleUpdate;
