import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Blog from '../models/blog.schema.js';
import Comment from '../models/comment.schema.js';

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (  email !== process.env.ADMIN_EMAIL ||
        password !== process.env.ADMIN_PASSWORD
  ) {
    throw new ApiError(400, "Invalid credentials");
  }
  const token = jwt.sign({ email, role: "admin" }, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1d"
  });

  return res.json(
    new ApiResponse(200, token, "Admin logged in successfully")
  );
});

export const verifyAdmin  = asyncHandler(async(req,res)=>{
  return res.status(200).json(
    new ApiResponse(200,req.user,"Token is valid")
  )
})

export const getDashboard = asyncHandler(async (req, res) => {
  const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
  const blogs = await Blog.countDocuments();
  const comments = await Comment.countDocuments();
  const drafts = await Blog.countDocuments({ isPublished: false });

  const dashboardData = { blogs, comments, drafts, recentBlogs };

  return res.status(200).json(
    new ApiResponse(200, dashboardData, "Dashboard data retrieved")
  );
});