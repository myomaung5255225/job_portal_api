import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export default function(req: any, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const token: any = authHeader.split(" ")[1];
      const decoded_token: any = jwt.verify(
        token,
        process.env.SECRET || "secret"
      );
      if (decoded_token) {
        const user_id: any = decoded_token.userId;

        req.userId = user_id;
        req.role = decoded_token.role;
        next();
      } else {
        const error: any = new Error("Unauthenticatd User!");
        error.statusCode = 401;
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
}
