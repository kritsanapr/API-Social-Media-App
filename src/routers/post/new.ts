import { Router, Request, Response, NextFunction } from "express";
import {
  BadRequestError,
  NotAuthorizedError,
  uploadImage,
} from "../../../common";
import Post from "../../models/posts";
import { User } from "../../models/user";
import fs from "fs";
import path from "path";

const router = Router();
router.post(
  "/api/post/new",
  uploadImage,
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    // Check if image is exist.
    if (!req.files) {
      return next(new BadRequestError("images are required"));
    }

    let images: Array<Express.Multer.File>;
    if (typeof req.files === "object") {
      images = Object.values(req.files);
    } else {
      images = req.files ? [...req.files] : [];
    }

    if (!title || !content) {
      return next(new BadRequestError("title and content are required"));
    }

    const newPost = Post.build({
      title,
      content,
      images: images.map((file: Express.Multer.File) => {
        let srcObj = {
          src: `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          // src: `data:${file.mimetype};base64,${fs
          //   .readFileSync(path.join("upload" + file.filename))
          //   .toString("64")}`,
        };
        fs.unlink(path.join("upload/" + file.filename), () => {});
        return srcObj;
      }),
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
