"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "require email!"],
        unique: [true, "email already used."],
        validate: [
            (val) => {
                isEmail_1.default(val);
            },
            "invalid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "require password"],
        min: [8, "minimum length is 8 characters"]
    },
    avatar: {
        type: String,
        default: ""
    },
    profile: {
        fullname: {
            type: String
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        }
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true });
exports.default = mongoose_1.model("user", userSchema);
//# sourceMappingURL=User.js.map