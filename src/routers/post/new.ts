import { Router, Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  uploadImage,
} from "../../../common";
import Post from "../../models/posts";
import { User } from "../../models/user";

const router = Router();

router.post(
  "/api/post/new",
  uploadImage,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return next(new BadRequestError("title and content are required"));
    }
    const newPost = Post.build({
      title,
      content,
    });

    await newPost.save();

    await User.findOneAndUpdate(
      { _id: req.currentUser!.userId },
      { $push: { posts: newPost._id } }
    );

    res.status(201).send(newPost);
  }
);

export { router as newPostRouter };
