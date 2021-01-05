"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const job_1 = require("../controllers/job");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const router = express_1.Router();
router.get("/all", job_1.all);
router.post("/create", isAuth_1.default, [
    express_validator_1.body("title")
        .notEmpty()
        .withMessage("title must not be empty"),
    express_validator_1.body("description")
        .notEmpty()
        .withMessage("description must not be empty"),
    express_validator_1.body("requirement")
        .notEmpty()
        .withMessage("requirement must not be empty"),
    express_validator_1.body("level")
        .notEmpty()
        .withMessage("level must not be empty - e.g entry,experienced,director,above director"),
    express_validator_1.body("job_type")
        .notEmpty()
        .withMessage('job type must not be empty. e.g full-time,part-time,contract"')
], job_1.create);
router.put("/edit", isAuth_1.default, [
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("Job Id must not be empty"),
    express_validator_1.body("title")
        .notEmpty()
        .withMessage("title must not be empty"),
    express_validator_1.body("description")
        .notEmpty()
        .withMessage("description must not be empty"),
    express_validator_1.body("requirement")
        .notEmpty()
        .withMessage("requirement must not be empty"),
    express_validator_1.body("level")
        .notEmpty()
        .withMessage("level must not be empty - e.g entry,experienced,director,above director"),
    express_validator_1.body("job_type")
        .notEmpty()
        .withMessage('job type must not be empty. e.g full-time,part-time,contract"')
], job_1.edit);
router.delete("/delete", isAuth_1.default, [
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("Job Id must not be empty")
], job_1.delete_job);
exports.default = router;
//# sourceMappingURL=job.js.map