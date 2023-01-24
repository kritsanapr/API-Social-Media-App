import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import {
  authenticationService,
  BadRequestError,
  RequestValidationError,
} from "../../../common";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
  "/signin",
  [
    body("email").isEmpty().isEmail().withMessage("a valid email is required"),
    body("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("a valid password is required"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new RequestValidationError(errors.array()));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) return next(new BadRequestError("wrong credentials"));

    const isEqual = await authenticationService.pwCompare(
      user!.password,
      password
    );

    if (!isEqual) return next(new BadRequestError("wrong credentials"));
    const token = jwt.sign({ email, userId: user!.id }, process.env.JWT_KEY!, {
      expiresIn: "10h",
    });

    req.session = { jwt: token };
    res.status(200).send(token);
  }
);

export { router as SigninRouter };
