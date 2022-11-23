import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";

const router = Router();
router.post(
  "/api/comment/show/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if (!id) {
      const allPosts = await Comment.find();
      return res.status(200).send(allPosts);
    }

    const post = await Comment.findOne({ _id: id }).populate("comments");

    res.status(200).send(post);
  }
);
export { router as showCommentRouter };
