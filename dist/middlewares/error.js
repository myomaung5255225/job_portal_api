"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(error, _req, res, next) {
    const { data, message } = error;
    const statusCode = error.statusCode;
    res.status(statusCode).json({ data, message });
    next();
}
exports.default = default_1;
//# sourceMappingURL=error.js.map