import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Job from "../models/job";
import { ApplicantModel } from "../models/applicant";
interface userForm {
  email: String;
  password: String;
}

// register
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      const hash_password = bcrypt.hashSync(req.body.password, 12);
      const user_data: userForm = {
        email: req.body.email,
        password: hash_password
      };
      const user = new User(user_data);
      const result: any = await user.save();
      if (result) {
        const token = jwt.sign(
          { userId: result._id, role: result.role },
          process.env.SECRET || "secret",
          { expiresIn: "1d" }
        );
        res.status(201).json({
          Data: result,
          status: 1,
          access_token: token,
          message: "User created successfully"
        });
      } else {
        const error: any = new Error("User create failed.");
        error.statusCode = 422;
        throw error;
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
// login
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed.");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user: any = await User.findOne({ email: req.body.email });
    if (user) {
      const isEqual = bcrypt.compareSync(req.body.password, user.password);
      if (isEqual) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.SECRET || "secret",
          { expiresIn: "1d" }
        );
        res.status(200).json({
          Data: user,
          message: "user login successfully!",
          status: 1,
          access_token: token
        });
      } else {
        const error: any = new Error("Password wrong");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error("User does not exist!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
// get user
export const getuser = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.userId) {
      const user = await User.findById(req.userId);

      if (user) {
        res.status(200).json({
          Data: user,
          status: 1,
          message: "success"
        });
      } else {
        const error: any = new Error("Unauthenticatd User!");
        error.statusCode = 401;
        throw error;
      }
    } else {
      const error: any = new Error("Unauthenticatd User!");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// update profile

export const updateuser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed.");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user: any = await User.findById(req.userId);
    if (user) {
      user.profile.fullname = req.body.fullname;
      user.profile.address = req.body.address;
      user.profile.city = req.body.city;
      user.profile.country = req.body.country;
      const result = await user.save();
      if (result) {
        res.status(201).json({
          Data: result,
          status: 1,
          message: "User updated successfully"
        });
      } else {
        const error: any = new Error("User update failed");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error("Unauthenticatd User!");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//delete user

export const deleteuser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.userId) {
      const user = await User.findByIdAndDelete(req.body.userId);
      if (user) {
        res.status(200).json({
          Data: user,
          status: 1,
          message: "User delete successfully"
        });
      } else {
        const error: any = new Error("User does not exist!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error("User does not exist!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const applyjob = async (req: any, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 442;
      throw error;
    } else {
      if (req.role === "user") {
        const cv: any = await ApplicantModel.findOne({ user: req.userId });
        if (cv) {
          const job: any = await Job.findById(req.body.job_id);
          if (job) {
            job.applicants.push(cv.id);
            const result = await job.save();
            if (result) {
              res.status(201).json({
                status: 1,
                message: "Job Apply successfully"
              });
            } else {
              const error: any = new Error("job apply fail!");
              error.statusCode = 422;
              throw error;
            }
          } else {
            const error: any = new Error("Job does not found!");
            error.statusCode = 404;
            throw error;
          }
        } else {
          const error: any = new Error("Your CV does not found!");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error(
          "Your Account is company account, You can not apply the job."
        );
        error.statusCode = 401;
        throw error;
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
