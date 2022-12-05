import { CustomError } from "./custom-error";

export class DatabaseConnection extends CustomError {
  statusCode = 500;

  constructor() {
    super("database connection error");
  }

  generateError() {
    return [{ message: "database connection error" }];
  }
}
