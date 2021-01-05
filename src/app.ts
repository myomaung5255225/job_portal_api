import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer, { FileFilterCallback } from "multer";
import { rootDir } from "./utils";
import path from "path";
import { v4 } from "uuid";
import error from "./middlewares/error";
import UserRouter from "./routes/User";
import SpecificationRouter from "./routes/specification";
import LocationRouter from "./routes/location";
import JobRouter from "./routes/job";
import ApplicantRouter from "./routes/applicant";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const db = process.env.DB || "";
app.use(cors);
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "images");
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}_${file.originalname}`);
  },
});

const filter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (file.mimetype === "image/jpg" || "image/png" || "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: storage, fileFilter: filter }).single("image"));
app.use(express.static(path.join(rootDir, "..", "images")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
mongoose
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

    app.use("/api/v1/user/", UserRouter);
    app.use("/api/v1/specs/", SpecificationRouter);
    app.use("/api/v1/location/", LocationRouter);
    app.use("/api/v1/job/", JobRouter);
    app.use("/api/v1/applicant", ApplicantRouter);
    app.use(error);
  })
  .catch((err) => {
    console.log(err.message);
  });
