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
exports.delete_job = exports.edit = exports.create = exports.all = void 0;
const job_1 = __importDefault(require("../models/job"));
const express_validator_1 = require("express-validator");
//get all jobs
const all = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield job_1.default.find()
            .sort({ updatedAt: "desc" })
            .populate("company", "profile");
        if (jobs) {
            res.status(200).json({
                Data: jobs,
                status: 1,
                message: "success"
            });
        }
        else {
            const error = new Error("No jobs Found!");
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
exports.all = all;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Faied");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            if (req.role === "editor") {
                const create_data = {
                    title: req.body.title,
                    description: req.body.description,
                    requirement: req.body.requirement,
                    level: req.body.level,
                    job_type: req.body.job_type,
                    company: req.userId
                };
                const job = new job_1.default(create_data);
                const result = yield job.save();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "Job created successfully!"
                    });
                }
                else {
                    const error = new Error("Job created fail.");
                    error.statusCode = 401;
                    throw error;
                }
            }
            else {
                const error = new Error("You does not have permission to create job.");
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
//edit job
const edit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            if (req.role === "editor") {
                const job = yield job_1.default.findById(req.body.id).where({
                    company: req.userId
                });
                if (job) {
                    job.title = req.body.title;
                    job.description = req.body.description;
                    job.requirement = req.body.requirement;
                    job.level = req.body.level;
                    job.job_type = req.body.job_type;
                    const result = yield job.save();
                    if (result) {
                        res.status(201).json({
                            Data: result,
                            message: "job edit successfully",
                            status: 1
                        });
                    }
                    else {
                        const error = new Error("Edit failed");
                        error.statusCode = 401;
                        throw error;
                    }
                }
                else {
                    const error = new Error("You does not have permission to edit this post");
                    error.statusCode = 401;
                    throw error;
                }
            }
            else {
                const error = new Error("You does not have permission to edit this post");
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
exports.edit = edit;
const delete_job = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.role === "editor") {
            const job = yield job_1.default.findByIdAndDelete(req.body.id).where({
                company: req.userId
            });
            if (job) {
                res.status(200).json({
                    Data: job,
                    status: 1,
                    message: "job deleted successfully"
                });
            }
            else {
                const error = new Error("You does not have permission to delete this job.");
                error.statusCode = 401;
                throw error;
            }
        }
        else {
            const error = new Error("You does not have permission to delete this job.");
            error.statusCode = 401;
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
exports.delete_job = delete_job;
//# sourceMappingURL=job.js.map