import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsycn = promisify(scrypt);

// class authentication.
export class Authentication {
  async pwToHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsycn(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  async pwCompare(storedPassword: string, suppliePaddword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsycn(suppliePaddword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}

// Export class authenticate
export const authenticationService = new Authentication();
