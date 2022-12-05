import express, { Request, Response, NextFunction } from "express";
import { urlencoded, json } from "body-parser";
import mongoose, { Error } from "mongoose";
import {
  newPostRouter,
  deletePostRouter,
  updatePostRouter,
  showPostRouter,
  newCommentRouter,
  deleteCommentRouter,
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
const port = process.env.PORT || 8080;
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

app.use(currentUser);
app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(deleteCommentRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});
const start = () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");

  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required");

  try {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log("Database Connected");
    });
  } catch (err) {
    throw new Error("Database connection error: ");
  }
  app.listen(port, () => console.log(`Server listening on ${port}`));
};

start();
