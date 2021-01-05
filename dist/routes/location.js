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
const location_1 = require("../controllers/location");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const location_2 = __importDefault(require("../models/location"));
const router = express_1.Router();
router.get("/all", location_1.all);
router.post("/create", isAuth_1.default, [
    express_validator_1.body("name")
        .notEmpty()
        .trim()
        .custom((v) => __awaiter(void 0, void 0, void 0, function* () {
        return location_2.default.findOne({ name: v })
            .then(location => {
            if (location) {
                return Promise.reject("This location is already created.");
            }
            else {
                return Promise.resolve();
            }
        })
            .catch(err => {
            return Promise.reject(err);
        });
    }))
], location_1.create);
router.put("/edit", isAuth_1.default, [
    express_validator_1.body("name")
        .notEmpty()
        .custom((v) => __awaiter(void 0, void 0, void 0, function* () {
        return location_2.default.findOne({ name: v })
            .then(location => {
            if (location) {
                return Promise.reject("This location is already created.");
            }
            else {
                return Promise.resolve();
            }
        })
            .catch(err => {
            return Promise.reject(err);
        });
    })),
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("Location Id required")
], location_1.edit);
router.delete("/delete", isAuth_1.default, [
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("Location Id required")
], location_1.delete_l);
exports.default = router;
//# sourceMappingURL=location.js.map