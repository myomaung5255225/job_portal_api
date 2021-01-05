import {
  getuser,
  signin,
  signup,
  deleteuser,
  updateuser,
  applyjob
} from "../controllers/User";
import { body } from "express-validator";
import User from "../models/User";
import { Router } from "express";
import isAuth from "../middlewares/isAuth";
const router = Router();

router.post(
  "/signin",
  [
    body("email")
      .notEmpty()
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(async (val: any) => {
        return User.findOne({ email: val })
          .then(user => {
            if (!user) {
              return Promise.reject("User email does not exist!");
            } else {
              return Promise.resolve();
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }),
    body("password")
      .notEmpty()
      .withMessage("Password must not be empty")
  ],
  signin
);
router.post(
  "/signup",
  [
    body("email")
      .notEmpty()
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(async (val: any) => {
        return User.findOne({ email: val })
          .then(user => {
            if (!user) {
              return Promise.resolve();
            } else {
              return Promise.reject("User Email alredy used");
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      })
  ],
  signup
);

router.get("/getuser", isAuth, [], getuser);
router.put(
  "/updateuser",
  isAuth,
  [
    body("fullname")
      .notEmpty()
      .withMessage("Full name must not be empty!"),
    body("address")
      .notEmpty()
      .withMessage("Address must not be empty"),
    body("city")
      .notEmpty()
      .withMessage("City must not be empty"),
    body("country")
      .notEmpty()
      .withMessage("Country must not be empty")
  ],
  updateuser
);

router.post(
  "/applyjob",
  isAuth,
  [
    body("job_id")
      .notEmpty()
      .withMessage("Job Id required!")
  ],
  applyjob
);

router.delete("/deleteuser", isAuth, deleteuser);
export default router;
