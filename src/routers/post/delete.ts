import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/posts";
import { BadRequestError, NotAuthorizedError } from "../../../common";
const router = Router();
router.delete(
  "/api/post/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequestError("post id is required"));
    }

    try {
      const deletePost = await Post.findOneAndRemove({ _id: id });
    } catch (err) {
      return next(new BadRequestError("post cannot be deleted"));
    }

    return res.status(200).json({ success: true });
  }
);
export { router as deletePostRouter };
