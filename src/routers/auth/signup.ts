import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
import { BadRequestError, RequestValidationError } from "../../../common";
import { body, validationResult } from "express-validator";

const router = Router();

router.post(
  "/signup",
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

    const user = await User.findOne({ email });
    if (user)
      return next(
        new BadRequestError("user with the same email already exists")
      );

    // const newUser = new User({
    //   email,
    //   password,
    //   post: [],
    // });

    const newUser = User.build({
      email,
      password,
    });

    await newUser.save();

    req.session = {
      jwt: jwt.sign({ email, userId: newUser.id }, process.env.JWT_KEY!),
    };

    res.status(201).send(newUser);
  }
);

export { router as SignupRouter };
