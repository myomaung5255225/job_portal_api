import {
  getapplicant,
  create,
  add_education,
  add_experience,
  delete_education,
  edit_education,
  edit_experience,
  delete_experience
} from "../controllers/applicant";
import isAuth from "../middlewares/isAuth";
import { Router } from "express";
import { body } from "express-validator";
const router = Router();
router.get("/mycv", isAuth, getapplicant);
router.post(
  "/createcv",
  isAuth,
  [
    body("fullname")
      .notEmpty()
      .withMessage("Full name must not be empty"),
    body("dateofbirth")
      .notEmpty()
      .withMessage("Date of Birth must not be empty"),
    body("address")
      .notEmpty()
      .withMessage("Address must not be empty"),
    body("city")
      .notEmpty()
      .withMessage("City must not be empty"),
    body("country")
      .notEmpty()
      .withMessage("Country not be empty")
  ],
  create
);
router.post(
  "/addexperience",
  isAuth,
  [
    body("title")
      .notEmpty()
      .withMessage("Title must not be empty"),
    body("company_name")
      .notEmpty()
      .withMessage("Company Name must not be empty"),
    body("from")
      .notEmpty()
      .isDate()
      .withMessage("From Date must not be empty"),
    body("to")
      .notEmpty()
      .isDate()
      .withMessage("To Date must not not be empty")
  ],
  add_experience
);
router.post(
  "/addeducation",
  isAuth,
  [
    body("school")
      .notEmpty()
      .withMessage("School or university must not be empty"),
    body("location")
      .notEmpty()
      .withMessage("School Location must not be empty"),
    body("degree_level")
      .notEmpty()
      .withMessage(
        "Degree level must not be empty e.g High School,Certificate,Diploma,Bechlor Degree,Master Degree,PHD"
      )
  ],
  add_education
);
router.delete(
  "/education-delete",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("Education Id must not be empty!")
  ],
  delete_education
);

router.delete(
  "/experience-delete",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("Experience Id must not be empty!")
  ],
  delete_experience
);

router.put(
  "/edit_education",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("Education Id must not be empty"),
    body("school")
      .notEmpty()
      .withMessage("School or university must not be empty"),
    body("location")
      .notEmpty()
      .withMessage("School Location must not be empty"),
    body("degree_level")
      .notEmpty()
      .withMessage(
        "Degree level must not be empty e.g High School,Certificate,Diploma,Bechlor Degree,Master Degree,PHD"
      )
  ],
  edit_education
);
router.put(
  "/edit_experience",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("Experience Id must not be empty"),
    body("title")
      .notEmpty()
      .withMessage("Title must not be empty"),
    body("company_name")
      .notEmpty()
      .withMessage("Company Name must not be empty"),
    body("from")
      .notEmpty()
      .isDate()
      .withMessage("From Date must not be empty"),
    body("to")
      .notEmpty()
      .isDate()
      .withMessage("To Date must not not be empty")
  ],
  edit_experience
);

export default router;
