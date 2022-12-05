import { Request, Response, NextFunction } from "express";
import { CustomError } from "../error/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.generateError() });
  }

  res.status(500).json({ error: [{ message: "something went wrong" }] });
};
