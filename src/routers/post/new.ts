import { Router, Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "../../../common";
import Post from "../../models/posts";
const router = Router();

router.post(
  "/api/post/new",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return next(new BadRequestError("title and content are required"));
    }
    const newPost = new Post({
      title,
      content,
    });

    await newPost.save();

    res.status(201).send(newPost);
  }
);

export { router as newPostRouter };
