import { all, create, edit, delete_job } from "../controllers/job";
import isAuth from "../middlewares/isAuth";
import { body } from "express-validator";
import { Router } from "express";

const router = Router();
router.get("/all", all);
router.post(
  "/create",
  isAuth,
  [
    body("title")
      .notEmpty()
      .withMessage("title must not be empty"),
    body("description")
      .notEmpty()
      .withMessage("description must not be empty"),
    body("requirement")
      .notEmpty()
      .withMessage("requirement must not be empty"),
    body("level")
      .notEmpty()
      .withMessage(
        "level must not be empty - e.g entry,experienced,director,above director"
      ),
    body("job_type")
      .notEmpty()
      .withMessage(
        'job type must not be empty. e.g full-time,part-time,contract"'
      )
  ],
  create
);

router.put(
  "/edit",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("Job Id must not be empty"),
    body("title")
      .notEmpty()
      .withMessage("title must not be empty"),
    body("description")
      .notEmpty()
      .withMessage("description must not be empty"),
    body("requirement")
      .notEmpty()
      .withMessage("requirement must not be empty"),
    body("level")
      .notEmpty()
      .withMessage(
        "level must not be empty - e.g entry,experienced,director,above director"
      ),
    body("job_type")
      .notEmpty()
      .withMessage(
        'job type must not be empty. e.g full-time,part-time,contract"'
      )
  ],
  edit
);
router.delete(
  "/delete",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("Job Id must not be empty")
  ],
  delete_job
);
export default router;
