import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("not found!");
  }

  generateError() {
    return [{ message: "not found!" }];
  }
}
