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
const User_1 = require("../controllers/User");
const express_validator_1 = require("express-validator");
const User_2 = __importDefault(require("../models/User"));
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const router = express_1.Router();
router.post("/signin", [
    express_validator_1.body("email")
        .notEmpty()
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        return User_2.default.findOne({ email: val })
            .then(user => {
            if (!user) {
                return Promise.reject("User email does not exist!");
            }
            else {
                return Promise.resolve();
            }
        })
            .catch(err => {
            return Promise.reject(err);
        });
    })),
    express_validator_1.body("password")
        .notEmpty()
        .withMessage("Password must not be empty")
], User_1.signin);
router.post("/signup", [
    express_validator_1.body("email")
        .notEmpty()
        .trim()
        .isEmail()
        .normalizeEmail()
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        return User_2.default.findOne({ email: val })
            .then(user => {
            if (!user) {
                return Promise.resolve();
            }
            else {
                return Promise.reject("User Email alredy used");
            }
        })
            .catch(err => {
            return Promise.reject(err);
        });
    }))
], User_1.signup);
router.get("/getuser", isAuth_1.default, [], User_1.getuser);
router.put("/updateuser", isAuth_1.default, [
    express_validator_1.body("fullname")
        .notEmpty()
        .withMessage("Full name must not be empty!"),
    express_validator_1.body("address")
        .notEmpty()
        .withMessage("Address must not be empty"),
    express_validator_1.body("city")
        .notEmpty()
        .withMessage("City must not be empty"),
    express_validator_1.body("country")
        .notEmpty()
        .withMessage("Country must not be empty")
], User_1.updateuser);
router.post("/applyjob", isAuth_1.default, [
    express_validator_1.body("job_id")
        .notEmpty()
        .withMessage("Job Id required!")
], User_1.applyjob);
router.delete("/deleteuser", isAuth_1.default, User_1.deleteuser);
exports.default = router;
//# sourceMappingURL=User.js.map