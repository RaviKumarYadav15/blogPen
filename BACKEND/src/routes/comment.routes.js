import express from "express";
import {  addComment,
          getAllComments,
          getCommentsByBlog,
          toggleApproveComment,
          deleteComment,
          approveCommentById
} from "../controllers/commentControllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const commentRouter = express.Router();

commentRouter.post("/", addComment);
commentRouter.get("/all", verifyToken, getAllComments);
commentRouter.get("/blog/:blogId", getCommentsByBlog);
commentRouter.post("/:commentId/toggle", verifyToken, toggleApproveComment);
commentRouter.delete("/:commentId", verifyToken, deleteComment);
commentRouter.post("/approve", verifyToken, approveCommentById);

export default commentRouter;