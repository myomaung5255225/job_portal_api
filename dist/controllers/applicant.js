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
Object.defineProperty(exports, "__esModule", { value: true });
exports.edit_experience = exports.edit_education = exports.delete_experience = exports.delete_education = exports.add_education = exports.add_experience = exports.create = exports.getapplicant = void 0;
const applicant_1 = require("../models/applicant");
const express_validator_1 = require("express-validator");
//get applicant
const getapplicant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.role === "user") {
            const applicant = yield applicant_1.ApplicantModel.findOne({
                user: req.userId
            })
                .populate("experience")
                .populate("education");
            if (applicant) {
                res.status(200).json({
                    Data: applicant,
                    status: 1,
                    message: "success"
                });
            }
            else {
                const error = new Error("You applicant not found!");
                error.statusCode = 404;
                throw error;
            }
        }
        else {
            const error = new Error("You cannot apply this job.");
            error.statusCode = 404;
            throw error;
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.getapplicant = getapplicant;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            if (req.role === "user") {
                const find_cv = yield applicant_1.ApplicantModel.findOne({ user: req.userId });
                if (find_cv) {
                    const error = new Error("Your application is already created.");
                    error.statusCode = 422;
                    throw error;
                }
                else {
                    const create_data = {
                        fullname: req.body.fullname,
                        dateofbirth: req.body.dateofbirth,
                        address: req.body.address,
                        city: req.body.city,
                        country: req.body.country,
                        user: req.userId
                    };
                    const cv = new applicant_1.ApplicantModel(create_data);
                    const result = yield cv.save();
                    if (result) {
                        res.status(201).json({
                            Data: result,
                            status: 1,
                            message: "CV created successfully"
                        });
                    }
                    else {
                        const error = new Error("CV created fail");
                        error.statusCode = 422;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error("You can not apply this job.");
                error.statusCode = 401;
                throw error;
            }
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.create = create;
const add_experience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validtion failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            const find_cv = yield applicant_1.ApplicantModel.findOne({ user: req.userId });
            if (find_cv) {
                const exp_data = {
                    title: req.body.title,
                    company_name: req.body.company_name,
                    from: req.body.from,
                    to: req.body.to,
                    jobfunction: req.body.jobfunction,
                    user: req.userId,
                    app_id: find_cv.id
                };
                const experience = new applicant_1.exprerienceModel(exp_data);
                const result = yield experience.save();
                if (result) {
                    find_cv.experience.push(result.id);
                    find_cv.save();
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "experience added successfully"
                    });
                }
                else {
                    const error = new Error("add experience failed");
                    error.statusCode = 422;
                    throw error;
                }
            }
            else {
                const error = new Error("Your CV does not exist!");
                error.statusCode = 404;
                throw error;
            }
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.add_experience = add_experience;
const add_education = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validtion failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            const find_cv = yield applicant_1.ApplicantModel.findOne({ user: req.userId });
            if (find_cv) {
                const edu_data = {
                    school: req.body.school,
                    location: req.body.location,
                    degree_level: req.body.degree_level,
                    user: req.userId,
                    app_id: find_cv.id
                };
                const experience = new applicant_1.educationModel(edu_data);
                const result = yield experience.save();
                if (result) {
                    find_cv.education.push(result.id);
                    find_cv.save();
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "education added successfully"
                    });
                }
                else {
                    const error = new Error("add education failed");
                    error.statusCode = 422;
                    throw error;
                }
            }
            else {
                const error = new Error("Your CV does not exist!");
                error.statusCode = 404;
                throw error;
            }
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.add_education = add_education;
//delete education
const delete_education = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validtion failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            if (req.role === "user") {
                const applicant = yield applicant_1.ApplicantModel.findOne({
                    user: req.userId
                });
                if (applicant) {
                    const education = yield applicant_1.educationModel.findByIdAndDelete(req.body.id);
                    if (education) {
                        res.status(200).json({
                            Data: education,
                            status: 1,
                            message: "education deleted successfully"
                        });
                    }
                    else {
                        const error = new Error("This education  doses not exist!");
                        error.statusCode = 404;
                        throw error;
                    }
                }
                else {
                    const error = new Error("Your CV does not exist!");
                    error.statusCode = 404;
                    throw error;
                }
            }
            else {
                const error = new Error("You cannot apply this job.");
                error.statusCode = 422;
                throw error;
            }
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.delete_education = delete_education;
//delete experience
const delete_experience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validtion failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            if (req.role === "user") {
                const applicant = yield applicant_1.ApplicantModel.findOne({
                    user: req.userId
                });
                if (applicant) {
                    const experience = yield applicant_1.exprerienceModel.findByIdAndDelete(req.body.id);
                    if (experience) {
                        res.status(200).json({
                            Data: experience,
                            status: 1,
                            message: "Experience deleted successfully"
                        });
                    }
                    else {
                        const error = new Error("This experience  doses not exist!");
                        error.statusCode = 404;
                        throw error;
                    }
                }
                else {
                    const error = new Error("Your CV does not exist!");
                    error.statusCode = 404;
                    throw error;
                }
            }
            else {
                const error = new Error("You cannot apply this job.");
                error.statusCode = 422;
                throw error;
            }
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.delete_experience = delete_experience;
const edit_education = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failded");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            const applicant = yield applicant_1.ApplicantModel.findOne({ user: req.userId });
            if (applicant) {
                const education = yield applicant_1.educationModel.findById(req.body.id);
                if (education) {
                    education.school = req.body.school;
                    education.location = req.body.location;
                    education.degree_level = req.body.degree_level;
                    const result = yield education.save();
                    if (result) {
                        res.status(201).json({
                            Data: result,
                            message: "edit successfully",
                            status: 1
                        });
                    }
                    else {
                        const error = new Error("Edit failed.");
                        error.statusCode = 422;
                        throw error;
                    }
                }
                else {
                    const error = new Error("This education does not exist!");
                    error.statusCode = 404;
                    throw error;
                }
            }
            else {
                const error = new Error("Your CV does not exist!");
                error.statusCode = 404;
                throw error;
            }
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.edit_education = edit_education;
const edit_experience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failded");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            const applicant = yield applicant_1.ApplicantModel.findOne({ user: req.userId });
            if (applicant) {
                const experience = yield applicant_1.exprerienceModel.findById(req.body.id);
                if (experience) {
                    experience.title = req.body.title;
                    experience.company_name = req.body.company_name;
                    experience.from = req.body.from;
                    experience.to = req.body.to;
                    experience.jobfunction = req.body.jobfunction;
                    const result = yield experience.save();
                    if (result) {
                        res.status(201).json({
                            Data: result,
                            message: "edit successfully",
                            status: 1
                        });
                    }
                    else {
                        const error = new Error("Edit failed.");
                        error.statusCode = 422;
                        throw error;
                    }
                }
                else {
                    const error = new Error("This experience does not exist!");
                    error.statusCode = 404;
                    throw error;
                }
            }
            else {
                const error = new Error("Your CV does not exist!");
                error.statusCode = 404;
                throw error;
            }
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
});
exports.edit_experience = edit_experience;
//# sourceMappingURL=applicant.js.map