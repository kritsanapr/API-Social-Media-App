"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPostRouter = void 0;
const express_1 = require("express");
const posts_1 = __importDefault(require("../../models/posts"));
const router = (0, express_1.Router)();
exports.showPostRouter = router;
router.get("/api/post/show/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        const allPosts = yield posts_1.default.find();
        return res.status(200).send(allPosts);
    }
    try {
        const post = yield posts_1.default.findOne({ _id: id });
        return res.status(200).json(post);
    }
    catch (err) {
        const error = new Error("post cannot be delete");
        error.status = 400;
        return next(error);
    }
}));
