"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("./utils");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const error_1 = __importDefault(require("./middlewares/error"));
const User_1 = __importDefault(require("./routes/User"));
const specification_1 = __importDefault(require("./routes/specification"));
const location_1 = __importDefault(require("./routes/location"));
const job_1 = __importDefault(require("./routes/job"));
const applicant_1 = __importDefault(require("./routes/applicant"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.PORT || 4000;
const db = process.env.DB || "";
//options for cors midddleware
app.use(function (_req, res, next) {
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Methods", "*");
    res.append("Access-Control-Allow-Headers", "*");
    next();
});
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "images");
    },
    filename: (_req, file, cb) => {
        cb(null, `${uuid_1.v4()}_${file.originalname}`);
    },
});
const filter = (_req, file, cb) => {
    if (file.mimetype === "image/jpg" || "image/png" || "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(multer_1.default({ storage: storage, fileFilter: filter }).single("image"));
app.use(express_1.default.static(path_1.default.join(utils_1.rootDir, "..", "images")));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/", (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "public", "index.html"));
});
mongoose_1.default
    .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port ${port}.`);
    });
    app.use("/api/v1/user/", User_1.default);
    app.use("/api/v1/specs/", specification_1.default);
    app.use("/api/v1/location/", location_1.default);
    app.use("/api/v1/job/", job_1.default);
    app.use("/api/v1/applicant", applicant_1.default);
    app.use(error_1.default);
})
    .catch((err) => {
    console.log(err.message);
});
//# sourceMappingURL=app.js.map