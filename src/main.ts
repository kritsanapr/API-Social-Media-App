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

import { requireAuth } from "../common/index";

const app = express();
const port = process.env.PORT || 8080;
declare global {
  interface CustomError extends Error {
    status?: number;
  }
}

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
app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({ message: "something went wrong" });
  }
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(showPostRouter);

app.use(requireAuth, newCommentRouter);
app.use(deleteCommentRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("not found!") as CustomError;
  error.status = 404;
  next(error);
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
