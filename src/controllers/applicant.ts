import { Response, NextFunction } from "express";
import {
  ApplicantModel,
  exprerienceModel,
  educationModel
} from "../models/applicant";
import { validationResult } from "express-validator";
//get applicant
export const getapplicant = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.role === "user") {
      const applicant: any = await ApplicantModel.findOne({
        user: req.userId
      })
        .populate("experience")
        .populate("education");

      if (applicant) {
        res.status(200).json({
          Data: applicant,
          status: 1,
          message: "success"
        });
      } else {
        const error: any = new Error("You applicant not found!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error("You cannot apply this job.");
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

//create cv

interface MyCV {
  fullname: String;
  dateofbirth: Date;
  address: String;
  city: String;
  country: String;
  user: any;
}

export const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      if (req.role === "user") {
        const find_cv: any = await ApplicantModel.findOne({ user: req.userId });
        if (find_cv) {
          const error: any = new Error("Your application is already created.");
          error.statusCode = 422;
          throw error;
        } else {
          const create_data: MyCV = {
            fullname: req.body.fullname,
            dateofbirth: req.body.dateofbirth,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            user: req.userId
          };
          const cv = new ApplicantModel(create_data);
          const result = await cv.save();
          if (result) {
            res.status(201).json({
              Data: result,
              status: 1,
              message: "CV created successfully"
            });
          } else {
            const error: any = new Error("CV created fail");
            error.statusCode = 422;
            throw error;
          }
        }
      } else {
        const error: any = new Error("You can not apply this job.");
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

interface experienceData {
  title: String;
  company_name: String;
  from: Date;
  to: Date;
  jobfunction: any;
  user: any;
  app_id: any;
}

export const add_experience = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validtion failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      const find_cv: any = await ApplicantModel.findOne({ user: req.userId });
      if (find_cv) {
        const exp_data: experienceData = {
          title: req.body.title,
          company_name: req.body.company_name,
          from: req.body.from,
          to: req.body.to,
          jobfunction: req.body.jobfunction,
          user: req.userId,
          app_id: find_cv.id
        };
        const experience = new exprerienceModel(exp_data);
        const result = await experience.save();
        if (result) {
          find_cv.experience.push(result.id);
          find_cv.save();
          res.status(201).json({
            Data: result,
            status: 1,
            message: "experience added successfully"
          });
        } else {
          const error: any = new Error("add experience failed");
          error.statusCode = 422;
          throw error;
        }
      } else {
        const error: any = new Error("Your CV does not exist!");
        error.statusCode = 404;
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
interface educationData {
  school: String;
  location: String;
  degree_level: String;
  user: any;
  app_id: any;
}
export const add_education = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validtion failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      const find_cv: any = await ApplicantModel.findOne({ user: req.userId });
      if (find_cv) {
        const edu_data: educationData = {
          school: req.body.school,
          location: req.body.location,
          degree_level: req.body.degree_level,
          user: req.userId,
          app_id: find_cv.id
        };
        const experience = new educationModel(edu_data);
        const result = await experience.save();

        if (result) {
          find_cv.education.push(result.id);
          find_cv.save();
          res.status(201).json({
            Data: result,
            status: 1,
            message: "education added successfully"
          });
        } else {
          const error: any = new Error("add education failed");
          error.statusCode = 422;
          throw error;
        }
      } else {
        const error: any = new Error("Your CV does not exist!");
        error.statusCode = 404;
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

//delete education
export const delete_education = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validtion failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      if (req.role === "user") {
        const applicant: any = await ApplicantModel.findOne({
          user: req.userId
        });
        if (applicant) {
          const education: any = await educationModel.findByIdAndDelete(
            req.body.id
          );
          if (education) {
            res.status(200).json({
              Data: education,
              status: 1,
              message: "education deleted successfully"
            });
          } else {
            const error: any = new Error("This education  doses not exist!");
            error.statusCode = 404;
            throw error;
          }
        } else {
          const error: any = new Error("Your CV does not exist!");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error("You cannot apply this job.");
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

//delete experience

export const delete_experience = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validtion failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      if (req.role === "user") {
        const applicant: any = await ApplicantModel.findOne({
          user: req.userId
        });
        if (applicant) {
          const experience: any = await exprerienceModel.findByIdAndDelete(
            req.body.id
          );
          if (experience) {
            res.status(200).json({
              Data: experience,
              status: 1,
              message: "Experience deleted successfully"
            });
          } else {
            const error: any = new Error("This experience  doses not exist!");
            error.statusCode = 404;
            throw error;
          }
        } else {
          const error: any = new Error("Your CV does not exist!");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error("You cannot apply this job.");
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

export const edit_education = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failded");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      const applicant: any = await ApplicantModel.findOne({ user: req.userId });
      if (applicant) {
        const education: any = await educationModel.findById(req.body.id);
        if (education) {
          education.school = req.body.school;
          education.location = req.body.location;
          education.degree_level = req.body.degree_level;
          const result = await education.save();
          if (result) {
            res.status(201).json({
              Data: result,
              message: "edit successfully",
              status: 1
            });
          } else {
            const error: any = new Error("Edit failed.");
            error.statusCode = 422;
            throw error;
          }
        } else {
          const error: any = new Error("This education does not exist!");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error("Your CV does not exist!");
        error.statusCode = 404;
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

export const edit_experience = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failded");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      const applicant: any = await ApplicantModel.findOne({ user: req.userId });
      if (applicant) {
        const experience: any = await exprerienceModel.findById(req.body.id);
        if (experience) {
          experience.title = req.body.title;
          experience.company_name = req.body.company_name;
          experience.from = req.body.from;
          experience.to = req.body.to;
          experience.jobfunction = req.body.jobfunction;
          const result = await experience.save();
          if (result) {
            res.status(201).json({
              Data: result,
              message: "edit successfully",
              status: 1
            });
          } else {
            const error: any = new Error("Edit failed.");
            error.statusCode = 422;
            throw error;
          }
        } else {
          const error: any = new Error("This experience does not exist!");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error("Your CV does not exist!");
        error.statusCode = 404;
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
