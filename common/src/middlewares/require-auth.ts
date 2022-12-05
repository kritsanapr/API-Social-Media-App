import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../error/not-authrized-error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) return next(new NotAuthorizedError());

  next();
};
