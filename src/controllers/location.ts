import { Request, Response, NextFunction } from "express";
import Location from "../models/location";
import { validationResult } from "express-validator";
//get all locations
export const all = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await Location.find().sort({ updatedAt: "desc" });
    if (locations) {
      res.status(200).json({
        Data: locations,
        status: 1,
        message: "success"
      });
    } else {
      const error: any = new Error("Locations not Found!");
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

//create location
interface CreateLocation {
  name: String;
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
      const create_data: CreateLocation = {
        name: req.body.name,
        user: req.userId
      };
      if (req.role === "editor" || "admin") {
        const location = new Location(create_data);
        const result = await location.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            message: "created successfully!"
          });
        } else {
          const error: any = new Error("location created fail.");
          error.statusCode = 422;
          throw error;
        }
      } else {
        const error: any = new Error(
          "You does not have permission to create location."
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

// update location

export const edit = async (req: any, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      if (req.role === "editor") {
        const location: any = await Location.findById(req.body.id).where({
          user: req.userId
        });
        if (location) {
          location.name = req.body.name;
          const result = await location.save();
          if (result) {
            res.status(201).json({
              Data: result,
              status: 1,
              message: "edit successfully"
            });
          } else {
            const error: any = new Error("edit fail!");
            error.statusCode = 422;
            throw error;
          }
        } else {
          const error: any = new Error(
            "You do not have permission to edit this location."
          );
          error.statusCode = 401;
          throw error;
        }
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
//delete location.....
export const delete_l = async (req: any, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation Failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    } else {
      const location: any = await Location.findByIdAndDelete(
        req.body.id
      ).where({ user: req.userId });
      if (location) {
        res.status(200).json({
          Data: location,
          message: "deleted successfully",
          status: 1
        });
      } else {
        const error: any = new Error(
          "You does not have permission to delete this location."
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
