import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("not authorized");
  }

  generateError() {
    return [{ message: "not authorized" }];
  }
}
