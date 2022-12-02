import mongoose from "mongoose";
import { authenticationService } from "./../../common/src/services/authentication";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password") || this.isNew) {
    const hashedPwd = authenticationService.pwToHash(this.get("password"));

    this.set("password, hashed");
  }

  done();
});

export const User = mongoose.model("User", userSchema);
