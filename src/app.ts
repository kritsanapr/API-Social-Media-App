import express, { Request, Response, NextFunction } from "express";
import { urlencoded, json } from "body-parser";

import {
  newPostRouter,
  deletePostRouter,
  updatePostRouter,
  showPostRouter,
  newCommentRouter,
  deleteCommentRouter,
  deleteImageRouter,
  addImagesRouter,
} from "./routers";
import cors from "cors";
import cookieSession from "cookie-session";
import * as dotenv from "dotenv";
dotenv.config();

import {
  requireAuth,
  currentUser,
  errorHandler,
  NotFoundError,
} from "../common/index";

const app = express();

declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

app.use(errorHandler);
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    msg: "working.",
  });
});

app.get("/help-check", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    msg: "help check working.",
  });
});

app.use(currentUser);
app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, deleteImageRouter);
app.use(requireAuth, addImagesRouter);

app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(deleteCommentRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

export { app };
