import { create, edit, delete_l, all } from "../controllers/location";
import isAuth from "../middlewares/isAuth";
import { Router } from "express";
import { body } from "express-validator";
import Location from "../models/location";
const router = Router();
router.get("/all", all);
router.post(
  "/create",
  isAuth,
  [
    body("name")
      .notEmpty()
      .trim()
      .custom(async (v: any) => {
        return Location.findOne({ name: v })
          .then(location => {
            if (location) {
              return Promise.reject("This location is already created.");
            } else {
              return Promise.resolve();
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      })
  ],
  create
);
router.put(
  "/edit",
  isAuth,
  [
    body("name")
      .notEmpty()
      .custom(async (v: any) => {
        return Location.findOne({ name: v })
          .then(location => {
            if (location) {
              return Promise.reject("This location is already created.");
            } else {
              return Promise.resolve();
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }),
    body("id")
      .notEmpty()
      .withMessage("Location Id required")
  ],
  edit
);
router.delete(
  "/delete",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("Location Id required")
  ],
  delete_l
);

export default router;
