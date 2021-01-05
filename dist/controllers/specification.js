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
exports.deleteSpec = exports.editspec = exports.createSepc = exports.getspecifications = void 0;
const Specification_1 = __importDefault(require("../models/Specification"));
const express_validator_1 = require("express-validator");
//get all specifications
const getspecifications = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specs = yield Specification_1.default.find().sort({ updatedAt: "desc" });
        if (specs) {
            res.status(200).json({
                Data: specs,
                status: 1,
                message: "success"
            });
        }
        else {
            const error = new Error("No Specifications !");
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
exports.getspecifications = getspecifications;
//create specification
const createSepc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            console.log(req.role);
            if (req.role === "editor" || "admin") {
                const create_data = {
                    name: req.body.name,
                    user: req.userId
                };
                const spec = new Specification_1.default(create_data);
                const result = yield spec.save();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "Created successfully"
                    });
                }
                else {
                    const error = new Error("create failed.");
                    error.statusCode = 404;
                    throw error;
                }
            }
            else {
                const error = new Error("You does not have permission to create specification");
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
exports.createSepc = createSepc;
//update specificatoin
const editspec = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        if (req.role === "editor") {
            const spec = yield Specification_1.default.findById(req.body.id).where({
                user: req.userId
            });
            if (spec) {
                spec.name = req.body.name;
                const result = yield spec.save();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "edit successfully"
                    });
                }
                else {
                    const error = new Error("edit fail");
                    error.statusCode = 422;
                    throw error;
                }
            }
            else {
                const error = new Error("Specification not found");
                error.statusCode = 404;
                throw error;
            }
        }
        else {
            const error = new Error("You does not have permission to edit this specification");
            error.statusCode = 401;
            throw error;
        }
        if (req.role === "admin") {
            const spec = yield Specification_1.default.findById(req.body.id);
            if (spec) {
                spec.name = req.body.name;
                const result = yield spec.save();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "edit successfully"
                    });
                }
                else {
                    const error = new Error("edit fail");
                    error.statusCode = 422;
                    throw error;
                }
            }
            else {
                const error = new Error("Specification not found");
                error.statusCode = 404;
                throw error;
            }
        }
        else {
            const error = new Error("You does not have permission to edit this specification");
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
exports.editspec = editspec;
const deleteSpec = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Failed");
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        else {
            if (req.role === "editor") {
                const result = yield Specification_1.default.findByIdAndDelete(req.body.id).where({ user: req.userId });
                if (result) {
                    res.status(200).json({
                        Data: result,
                        status: 1,
                        message: "Deleted successfully"
                    });
                }
                else {
                    const error = new Error("specification delete fail.");
                    error.statusCode = 404;
                    throw error;
                }
            }
            else {
                const error = new Error("You do not have permission to delete this specification.");
                error.statusCode = 401;
                throw error;
            }
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            throw error;
        }
        next(error);
    }
});
exports.deleteSpec = deleteSpec;
//# sourceMappingURL=specification.js.map