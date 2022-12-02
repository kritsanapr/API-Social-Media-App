import { Router, Request, Response, NextFunction } from "express";
import { currentUser } from "../../../common";

const router = Router();

router.get("/current-user", currentUser, async (req, res, next) => {
  res.status(200).send({ currentUser: req.currentUser });
});

export { router as currntUserRouter };
