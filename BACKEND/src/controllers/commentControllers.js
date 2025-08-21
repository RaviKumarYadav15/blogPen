import mongoose from "mongoose";
import Comment from "../models/comment.schema.js";
import Blog from "../models/blog.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addComment = asyncHandler(async (req, res) => {
  const { name, content, blogId } = req.body;

  if (!name || !content || !blogId) {
    throw new ApiError(400, "All fields are required");
  }

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    throw new ApiError(400, "Invalid blog ID");
  }

  const blog = await Blog.findById(blogId);
  if (!blog || !blog?.isPublished) {
    throw new ApiError(404, "Blog not found");
  }

  const comment = await Comment.create({
    name,
    content,
    blog: blog._id,
    isApproved: false,
  });

  return res.status(201).json(
    new ApiResponse(201, comment, "Comment added. Awaiting approval.")
  );
});

export const getAllComments = asyncHandler(async (req, res) => {
  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Forbidden: Admins only");
  }
  const comments = await Comment.find().populate("blog", "title").sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, comments, "Fetched all comments")
  );
});

export const getCommentsByBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    throw new ApiError(400, "Invalid blog ID");
  }
  const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, comments, "Fetched blog comments")
  );
});

export const toggleApproveComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Forbidden: Admins only");
  }

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  comment.isApproved = !comment.isApproved;
  await comment.save();

  return res.status(200).json(
    new ApiResponse(200, comment, `Comment ${comment.isApproved ? "approved" : "unapproved"}`)
  );
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Forbidden: Admins only");
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const comment = await Comment.findByIdAndDelete(commentId);
  if (!comment) throw new ApiError(404, "Comment not found");

  return res.status(200).json(
    new ApiResponse(200, null, "Comment deleted successfully.")
  );
});

export const approveCommentById = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Forbidden: Admins only");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid comment ID");
  }

  const updatedComment = await Comment.findByIdAndUpdate(id, { isApproved: true }, { new: true });

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found");
  }

  return res.status(200).json(
    new ApiResponse(200, updatedComment, "Comment approved successfully.")
  );
});