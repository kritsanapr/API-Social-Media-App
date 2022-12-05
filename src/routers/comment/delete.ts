import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";
import Post from "../../models/posts";
import { BadRequestError } from "../../../common";
const router = Router();
router.delete(
  "/api/comment/delete/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;

    if (!commentId || !postId) {
      const error = new BadRequestError(
        "post id and comment id are required"
      ) as CustomError;
      error.status = 400;
      return next(error);
    }

    try {
      const deleteComment = await Comment.findOneAndRemove({ _id: commentId });
    } catch (err) {
      const error = new Error("Comment cannot be deleted!") as CustomError;
      error.status = 400;
      return next(error);
    }

    await Post.findOneAndUpdate(
      { _id: postId },
      { $pull: { comments: commentId } }
    );

    return res.status(200).json({ success: true });
  }
);
export { router as deleteCommentRouter };
