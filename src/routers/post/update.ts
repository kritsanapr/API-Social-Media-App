import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/posts";

const router = Router();

router.post(
  "/api/post/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      const error = new Error("post id is required") as CustomError;
      error.status = 400;
      return next(error);
    }

    let updatePost;

    try {
      const updatePost = await Post.findOneAndUpdate(
        { _id: id },
        { $set: { title, content } },
        { new: true }
      );
    } catch (err) {
      const error = new Error("post cannot be updated") as CustomError;
      error.status = 400;
      return next(error);
    }

    return res.status(200).send(updatePost);
  }
);

export { router as updatePostRouter };
