import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/posts";
import { BadRequestError } from "../../../common";
const router = Router();

router.post(
  "/api/post/update/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
      return next(new BadRequestError("post id is required"));
    }

    let updatePost;

    try {
      const updatePost = await Post.findOneAndUpdate(
        { _id: id },
        { $set: { title, content } },
        { new: true }
      );
    } catch (err) {
      return next(new BadRequestError("post cannot be updated"));
    }

    return res.status(200).send(updatePost);
  }
);

export { router as updatePostRouter };
