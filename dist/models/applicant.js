"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantModel = exports.exprerienceModel = exports.educationModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
//education model
const educationSchema = new mongoose_1.Schema({
    school: {
        type: String,
        required: [true, "enter school or university"]
    },
    location: {
        type: String,
        required: [true, "enter school location"]
    },
    degree_level: {
        type: String,
        enum: [
            "High School",
            "Certificate",
            "Diploma",
            "Bechlor Degree",
            "Master Degree",
            "PHD"
        ],
        required: [
            true,
            "Required e.g High School,Certificate,Diploma,Bechlor Degree,Master Degree,PHD"
        ]
    },
    user: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "user"
    },
    app_id: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "applicant"
    }
});
exports.educationModel = mongoose_1.model("education", educationSchema);
//experience model
const experienceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "require job title"]
    },
    company_name: {
        type: String,
        required: [true, "require company name"]
    },
    from: {
        type: Date,
        required: [true, "require from date"]
    },
    to: {
        type: Date,
        required: [true, "require to date."]
    },
    jobfuntion: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "jobfunction"
    },
    user: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "user"
    },
    app_id: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "applicant"
    }
});
exports.exprerienceModel = mongoose_1.model("experience", experienceSchema);
//applicant model
const applicantSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: [true, "Require full name"]
    },
    dateofbirth: {
        type: Date,
        required: [true, "Require date of birth"]
    },
    address: {
        type: String,
        required: [true, "Require address"]
    },
    city: {
        type: String,
        required: [true, "Require city"]
    },
    country: {
        type: String,
        required: [true, "Require country"]
    },
    experience: [{ type: mongoose_2.default.Types.ObjectId, ref: "experience" }],
    education: [{ type: mongoose_2.default.Types.ObjectId, ref: "education" }],
    user: { type: mongoose_2.default.Types.ObjectId, ref: "user" }
}, { timestamps: true });
exports.ApplicantModel = mongoose_1.model("applicant", applicantSchema);
//# sourceMappingURL=applicant.js.map