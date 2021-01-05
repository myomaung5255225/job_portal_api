import { Request, Response, NextFunction } from "express";
import Job from "../models/job";
import { validationResult } from "express-validator";

//get all jobs
export const all = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = await Job.find()
      .sort({ updatedAt: "desc" })
      .populate("company", "profile");
    if (jobs) {
      res.status(200).json({
        Data: jobs,
        status: 1,
        message: "success"
      });
    } else {
      const error: any = new Error("No jobs Found!");
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

//create a new job
interface JobFrom {
  title: String;
  description: String;
  requirement: String;
  level: String;
  job_type: String;
  company: any;
}
export const create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Faied");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      if (req.role === "editor") {
        const create_data: JobFrom = {
          title: req.body.title,
          description: req.body.description,
          requirement: req.body.requirement,
          level: req.body.level,
          job_type: req.body.job_type,
          company: req.userId
        };
        const job = new Job(create_data);
        const result = await job.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            message: "Job created successfully!"
          });
        } else {
          const error: any = new Error("Job created fail.");
          error.statusCode = 401;
          throw error;
        }
      } else {
        const error: any = new Error(
          "You does not have permission to create job."
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
//edit job
export const edit = async (req: any, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      if (req.role === "editor") {
        const job: any = await Job.findById(req.body.id).where({
          company: req.userId
        });
        if (job) {
          job.title = req.body.title;
          job.description = req.body.description;
          job.requirement = req.body.requirement;
          job.level = req.body.level;
          job.job_type = req.body.job_type;

          const result = await job.save();
          if (result) {
            res.status(201).json({
              Data: result,
              message: "job edit successfully",
              status: 1
            });
          } else {
            const error: any = new Error("Edit failed");
            error.statusCode = 401;
            throw error;
          }
        } else {
          const error: any = new Error(
            "You does not have permission to edit this post"
          );
          error.statusCode = 401;
          throw error;
        }
      } else {
        const error: any = new Error(
          "You does not have permission to edit this post"
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

export const delete_job = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.role === "editor") {
      const job = await Job.findByIdAndDelete(req.body.id).where({
        company: req.userId
      });
      if (job) {
        res.status(200).json({
          Data: job,
          status: 1,
          message: "job deleted successfully"
        });
      } else {
        const error: any = new Error(
          "You does not have permission to delete this job."
        );
        error.statusCode = 401;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to delete this job."
      );
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
