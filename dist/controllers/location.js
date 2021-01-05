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
exports.delete_l = exports.edit = exports.create = exports.all = void 0;
const location_1 = __importDefault(require("../models/location"));
const express_validator_1 = require("express-validator");
//get all locations
const all = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield location_1.default.find().sort({ updatedAt: "desc" });
        if (locations) {
            res.status(200).json({
                Data: locations,
                status: 1,
                message: "success"
            });
        }
        else {
            const error = new Error("Locations not Found!");
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
            const error = new Error("Validation Failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            const create_data = {
                name: req.body.name,
                user: req.userId
            };
            if (req.role === "editor" || "admin") {
                const location = new location_1.default(create_data);
                const result = yield location.save();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "created successfully!"
                    });
                }
                else {
                    const error = new Error("location created fail.");
                    error.statusCode = 422;
                    throw error;
                }
            }
            else {
                const error = new Error("You does not have permission to create location.");
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
// update location
const edit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            if (req.role === "editor") {
                const location = yield location_1.default.findById(req.body.id).where({
                    user: req.userId
                });
                if (location) {
                    location.name = req.body.name;
                    const result = yield location.save();
                    if (result) {
                        res.status(201).json({
                            Data: result,
                            status: 1,
                            message: "edit successfully"
                        });
                    }
                    else {
                        const error = new Error("edit fail!");
                        error.statusCode = 422;
                        throw error;
                    }
                }
                else {
                    const error = new Error("You do not have permission to edit this location.");
                    error.statusCode = 401;
                    throw error;
                }
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
//delete location.....
const delete_l = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error("Validation Failed");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        else {
            const location = yield location_1.default.findByIdAndDelete(req.body.id).where({ user: req.userId });
            if (location) {
                res.status(200).json({
                    Data: location,
                    message: "deleted successfully",
                    status: 1
                });
            }
            else {
                const error = new Error("You does not have permission to delete this location.");
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
exports.delete_l = delete_l;
//# sourceMappingURL=location.js.map