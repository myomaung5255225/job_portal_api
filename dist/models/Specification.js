"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const specSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: [true, "already used."],
        required: [true, "require specification name."]
    },
    user: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });
exports.default = mongoose_1.model("specification", specSchema);
//# sourceMappingURL=Specification.js.map