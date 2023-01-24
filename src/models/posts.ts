import mongoose from "mongoose";
import mogoose from "mongoose";
import { CommentDoc } from "./comment";
export interface PostDoc extends mongoose.Document {
  title: string;
  content: string;
  images: Array<{ src: string }>;
  comments?: Array<CommentDoc>;
}

export interface CreatePostDto {
  title: string;
  content: string;
  images: Array<{ src: string }>;
}

export interface PostModel extends mongoose.Model<PostDoc> {
  build(dto: CreatePostDto): PostDoc;
}

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  images: [
    {
      src: { type: String, require: true },
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

postsSchema.statics.build = (createPostDto: CreatePostDto) => {
  return new Post(createPostDto);
};

const Post = mongoose.model<PostDoc, PostModel>("Post", postsSchema);

export default Post;
