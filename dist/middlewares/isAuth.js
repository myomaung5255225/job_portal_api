"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, _res, next) {
    try {
        const authHeader = req.get("Authorization");
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const decoded_token = jsonwebtoken_1.default.verify(token, process.env.SECRET || "secret");
            if (decoded_token) {
                const user_id = decoded_token.userId;
                req.userId = user_id;
                req.role = decoded_token.role;
                next();
            }
            else {
                const error = new Error("Unauthenticatd User!");
                error.statusCode = 401;
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
}
exports.default = default_1;
//# sourceMappingURL=isAuth.js.map