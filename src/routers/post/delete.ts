import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/posts";
import { User, UserDoc } from "../../models/user";
import { BadRequestError, NotAuthorizedError } from "../../../common";
const router = Router();
router.delete(
  "/api/post/delete/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequestError("post id is required"));
    }

    let user: UserDoc | null;

    try {
      const deletePost = await Post.findOneAndRemove({ _id: id });
    } catch (err) {
      return next(new BadRequestError("post cannot be deleted"));
    }

    user = await User.findOneAndUpdate(
      { _id: req.currentUser!.userId },
      { $pull: { posts: id } },
      { new: true }
    );

    if (!user) return next(new Error());

    return res.status(200).json(user);
  }
);
export { router as deletePostRouter };
