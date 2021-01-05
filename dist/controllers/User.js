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
exports.applyjob = exports.deleteuser = exports.updateuser = exports.getuser = exports.signin = exports.signup = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const job_1 = __importDefault(require("../models/job"));
const applicant_1 = require("../models/applicant");
// register
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            const hash_password = bcrypt_1.default.hashSync(req.body.password, 12);
            const user_data = {
                email: req.body.email,
                password: hash_password
            };
            const user = new User_1.default(user_data);
            const result = yield user.save();
            if (result) {
                const token = jsonwebtoken_1.default.sign({ userId: result._id, role: result.role }, process.env.SECRET || "secret", { expiresIn: "1d" });
                res.status(201).json({
                    Data: result,
                    status: 1,
                    access_token: token,
                    message: "User created successfully"
                });
            }
            else {
                const error = new Error("User create failed.");
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
exports.signup = signup;
// login
const signin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const user = yield User_1.default.findOne({ email: req.body.email });
        if (user) {
            const isEqual = bcrypt_1.default.compareSync(req.body.password, user.password);
            if (isEqual) {
                const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.SECRET || "secret", { expiresIn: "1d" });
                res.status(200).json({
                    Data: user,
                    message: "user login successfully!",
                    status: 1,
                    access_token: token
                });
            }
            else {
                const error = new Error("Password wrong");
                error.statusCode = 422;
                throw error;
            }
        }
        else {
            const error = new Error("User does not exist!");
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
exports.signin = signin;
// get user
const getuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.userId) {
            const user = yield User_1.default.findById(req.userId);
            if (user) {
                res.status(200).json({
                    Data: user,
                    status: 1,
                    message: "success"
                });
            }
            else {
                const error = new Error("Unauthenticatd User!");
                error.statusCode = 401;
                throw error;
            }
        }
        else {
            const error = new Error("Unauthenticatd User!");
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
exports.getuser = getuser;
// update profile
const updateuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed.");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const user = yield User_1.default.findById(req.userId);
        if (user) {
            user.profile.fullname = req.body.fullname;
            user.profile.address = req.body.address;
            user.profile.city = req.body.city;
            user.profile.country = req.body.country;
            const result = yield user.save();
            if (result) {
                res.status(201).json({
                    Data: result,
                    status: 1,
                    message: "User updated successfully"
                });
            }
            else {
                const error = new Error("User update failed");
                error.statusCode = 422;
                throw error;
            }
        }
        else {
            const error = new Error("Unauthenticatd User!");
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
exports.updateuser = updateuser;
//delete user
const deleteuser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.userId) {
            const user = yield User_1.default.findByIdAndDelete(req.body.userId);
            if (user) {
                res.status(200).json({
                    Data: user,
                    status: 1,
                    message: "User delete successfully"
                });
            }
            else {
                const error = new Error("User does not exist!");
                error.statusCode = 404;
                throw error;
            }
        }
        else {
            const error = new Error("User does not exist!");
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
exports.deleteuser = deleteuser;
const applyjob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed");
            error.data = errors.array();
            error.statusCode = 442;
            throw error;
        }
        else {
            if (req.role === "user") {
                const cv = yield applicant_1.ApplicantModel.findOne({ user: req.userId });
                if (cv) {
                    const job = yield job_1.default.findById(req.body.job_id);
                    if (job) {
                        job.applicants.push(cv.id);
                        const result = yield job.save();
                        if (result) {
                            res.status(201).json({
                                status: 1,
                                message: "Job Apply successfully"
                            });
                        }
                        else {
                            const error = new Error("job apply fail!");
                            error.statusCode = 422;
                            throw error;
                        }
                    }
                    else {
                        const error = new Error("Job does not found!");
                        error.statusCode = 404;
                        throw error;
                    }
                }
                else {
                    const error = new Error("Your CV does not found!");
                    error.statusCode = 404;
                    throw error;
                }
            }
            else {
                const error = new Error("Your Account is company account, You can not apply the job.");
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
exports.applyjob = applyjob;
//# sourceMappingURL=User.js.map