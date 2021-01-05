import { Request, Response, NextFunction } from "express";
import Specification from "../models/Specification";
import { validationResult } from "express-validator";
//get all specifications
export const getspecifications = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const specs = await Specification.find().sort({ updatedAt: "desc" });
    if (specs) {
      res.status(200).json({
        Data: specs,
        status: 1,
        message: "success"
      });
    } else {
      const error: any = new Error("No Specifications !");
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
interface Spec {
  name: String;
  user: any;
}

//create specification
export const createSepc = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      console.log(req.role);
      if (req.role === "editor" || "admin") {
        const create_data: Spec = {
          name: req.body.name,
          user: req.userId
        };
        const spec = new Specification(create_data);
        const result = await spec.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            message: "Created successfully"
          });
        } else {
          const error: any = new Error("create failed.");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error(
          "You does not have permission to create specification"
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
//update specificatoin
export const editspec = async (req: any, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    if (req.role === "editor") {
      const spec: any = await Specification.findById(req.body.id).where({
        user: req.userId
      });
      if (spec) {
        spec.name = req.body.name;
        const result = await spec.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            message: "edit successfully"
          });
        } else {
          const error: any = new Error("edit fail");
          error.statusCode = 422;
          throw error;
        }
      } else {
        const error: any = new Error("Specification not found");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to edit this specification"
      );
      error.statusCode = 401;
      throw error;
    }
    if (req.role === "admin") {
      const spec: any = await Specification.findById(req.body.id);
      if (spec) {
        spec.name = req.body.name;
        const result = await spec.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            message: "edit successfully"
          });
        } else {
          const error: any = new Error("edit fail");
          error.statusCode = 422;
          throw error;
        }
      } else {
        const error: any = new Error("Specification not found");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error(
        "You does not have permission to edit this specification"
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

export const deleteSpec = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    } else {
      if (req.role === "editor") {
        const result = await Specification.findByIdAndDelete(
          req.body.id
        ).where({ user: req.userId });
        if (result) {
          res.status(200).json({
            Data: result,
            status: 1,
            message: "Deleted successfully"
          });
        } else {
          const error: any = new Error("specification delete fail.");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error(
          "You do not have permission to delete this specification."
        );
        error.statusCode = 401;
        throw error;
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      throw error;
    }
    next(error);
  }
};
