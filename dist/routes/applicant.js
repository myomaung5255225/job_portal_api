"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const applicant_1 = require("../controllers/applicant");
const isAuth_1 = __importDefault(require("../middlewares/isAuth"));
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
router.get("/mycv", isAuth_1.default, applicant_1.getapplicant);
router.post("/createcv", isAuth_1.default, [
    express_validator_1.body("fullname")
        .notEmpty()
        .withMessage("Full name must not be empty"),
    express_validator_1.body("dateofbirth")
        .notEmpty()
        .withMessage("Date of Birth must not be empty"),
    express_validator_1.body("address")
        .notEmpty()
        .withMessage("Address must not be empty"),
    express_validator_1.body("city")
        .notEmpty()
        .withMessage("City must not be empty"),
    express_validator_1.body("country")
        .notEmpty()
        .withMessage("Country not be empty")
], applicant_1.create);
router.post("/addexperience", isAuth_1.default, [
    express_validator_1.body("title")
        .notEmpty()
        .withMessage("Title must not be empty"),
    express_validator_1.body("company_name")
        .notEmpty()
        .withMessage("Company Name must not be empty"),
    express_validator_1.body("from")
        .notEmpty()
        .isDate()
        .withMessage("From Date must not be empty"),
    express_validator_1.body("to")
        .notEmpty()
        .isDate()
        .withMessage("To Date must not not be empty")
], applicant_1.add_experience);
router.post("/addeducation", isAuth_1.default, [
    express_validator_1.body("school")
        .notEmpty()
        .withMessage("School or university must not be empty"),
    express_validator_1.body("location")
        .notEmpty()
        .withMessage("School Location must not be empty"),
    express_validator_1.body("degree_level")
        .notEmpty()
        .withMessage("Degree level must not be empty e.g High School,Certificate,Diploma,Bechlor Degree,Master Degree,PHD")
], applicant_1.add_education);
router.delete("/education-delete", isAuth_1.default, [
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("Education Id must not be empty!")
], applicant_1.delete_education);
router.delete("/experience-delete", isAuth_1.default, [
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("Experience Id must not be empty!")
], applicant_1.delete_experience);
router.put("/edit_education", isAuth_1.default, [
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("Education Id must not be empty"),
    express_validator_1.body("school")
        .notEmpty()
        .withMessage("School or university must not be empty"),
    express_validator_1.body("location")
        .notEmpty()
        .withMessage("School Location must not be empty"),
    express_validator_1.body("degree_level")
        .notEmpty()
        .withMessage("Degree level must not be empty e.g High School,Certificate,Diploma,Bechlor Degree,Master Degree,PHD")
], applicant_1.edit_education);
router.put("/edit_experience", isAuth_1.default, [
    express_validator_1.body("id")
        .notEmpty()
        .withMessage("Experience Id must not be empty"),
    express_validator_1.body("title")
        .notEmpty()
        .withMessage("Title must not be empty"),
    express_validator_1.body("company_name")
        .notEmpty()
        .withMessage("Company Name must not be empty"),
    express_validator_1.body("from")
        .notEmpty()
        .isDate()
        .withMessage("From Date must not be empty"),
    express_validator_1.body("to")
        .notEmpty()
        .isDate()
        .withMessage("To Date must not not be empty")
], applicant_1.edit_experience);
exports.default = router;
//# sourceMappingURL=applicant.js.map