import {
  createSepc,
  getspecifications,
  editspec,
  deleteSpec
} from "../controllers/specification";
import Specification from "../models/Specification";
import { Router } from "express";
import isAuth from "../middlewares/isAuth";
import { body } from "express-validator";
const router = Router();
router.get("/all", getspecifications);
router.post(
  "/create",
  isAuth,
  [
    body("name")
      .notEmpty()
      .custom(async (v: any) => {
        return Specification.findOne({ name: v })
          .then(spec => {
            if (spec) {
              return Promise.reject("This specification is already created!");
            } else {
              return Promise.resolve();
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      })
  ],
  createSepc
);
router.put(
  "/edit",
  isAuth,
  [
    body("name")
      .notEmpty()
      .custom(async (v: any) => {
        return Specification.findOne({ name: v }).then(spec => {
          if (spec) {
            return Promise.reject("This specification is already created!");
          } else {
            return Promise.resolve();
          }
        });
      }),
    body("id")
      .notEmpty()
      .withMessage("specification Id required.")
  ],
  editspec
);
router.delete(
  "/delete",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("specification Id required.")
  ],
  deleteSpec
);
export default router;
