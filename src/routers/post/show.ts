import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/posts";

const router = Router();
router.get(
  "/api/post/show/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      const allPosts = await Post.find();
      return res.status(200).send(allPosts);
    }

    try {
      const post = await Post.findOne({ _id: id }).populate("comments");
      return res.status(200).json(post);
    } catch (err) {
      const error = new Error("post cannot be delete") as CustomError;
      error.status = 400;
      return next(error);
    }
  }
);
export { router as showPostRouter };
