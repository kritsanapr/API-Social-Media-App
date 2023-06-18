import mongoose from "mongoose";
import { app } from "./app";

const port = process.env.PORT || 8080;

const start = () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required");

  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is required");

  try {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log("Database Connected");
    });
  } catch (err) {
    throw new Error("Database connection error: ");
  }
  app.listen(port, () =>
    console.log(`Server listening on http://localhost:${port}`)
  );
};

start();
