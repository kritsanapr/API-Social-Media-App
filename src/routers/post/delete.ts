import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/posts";

const router = Router();
router.delete(
  "/api/post/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      const error = new Error("post id is required") as CustomError;
      error.status = 400;
      return next(error);
    }

    try {
      const deletePost = await Post.findOneAndRemove({ _id: id });
    } catch (err) {
      const error = new Error("post cannot be delete") as CustomError;
      error.status = 400;
      return next(error);
    }

    return res.status(200).json({ success: true });
  }
);
export { router as deletePostRouter };
