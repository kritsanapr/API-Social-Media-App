import { NextFunction } from "express";
import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
  }

  generateError() {
    return [{ message: this.message }];
  }
}
