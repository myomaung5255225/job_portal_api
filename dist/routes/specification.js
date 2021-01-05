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
const specification_1 = require("../controllers/specification");
const Specification_1 = __importDefault(require("../models/Specification"));
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router.get("/all", specification_1.getspecifications);
router.post("/create", isAuth_1.default, [
    express_validator_1.body("name")
        .notEmpty()
        .custom((v) => __awaiter(void 0, void 0, void 0, function* () {
        return Specification_1.default.findOne({ name: v })
            .then(spec => {
            if (spec) {
                return Promise.reject("This specification is already created!");
            }
            else {
                return Promise.resolve();
            }
        })
            .catch(err => {
            return Promise.reject(err);
        });
    }))
], specification_1.createSepc);
router.put("/edit", isAuth_1.default, [
    express_validator_1.body("name")
        .notEmpty()
        .custom((v) => __awaiter(void 0, void 0, void 0, function* () {
        return Specification_1.default.findOne({ name: v }).then(spec => {
            if (spec) {
                return Promise.reject("This specification is already created!");
            }
            else {
                return Promise.resolve();
            }
        });
    })),
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("specification Id required.")
], specification_1.editspec);
router.delete("/delete", isAuth_1.default, [
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("specification Id required.")
], specification_1.deleteSpec);
exports.default = router;
//# sourceMappingURL=specification.js.map