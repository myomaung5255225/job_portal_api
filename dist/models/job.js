"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const jobSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "require title"]
    },
    description: {
        type: String,
        required: [true, "require description"]
    },
    requirement: {
        type: String,
        required: [true, "require description"]
    },
    level: {
        type: String,
        enum: ["entry", "experienced", "manager", "director", "above director"],
        required: [
            true,
            "Please select e.g entry,experienced,director,above director"
        ]
    },
    job_type: {
        type: String,
        enum: ["full-time", "part-time", "contract"],
        required: [true, "Please select e.g full-time,part-time,contract"]
    },
    company: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "user"
    },
    applicants: [
        {
            type: mongoose_2.default.Types.ObjectId,
            ref: "applicant"
        }
    ]
}, { timestamps: true });
exports.default = mongoose_1.model("job", jobSchema);
//# sourceMappingURL=job.js.map