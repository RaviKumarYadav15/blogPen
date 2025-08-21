import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import Blog from '../models/blog.schema.js';
import Comment from '../models/comment.schema.js';
import main from '../utils/gemini.js';

// Add new blog
export const addBlog = asyncHandler(async (req, res) => {
  const { blog } = req.body;

  if (!blog) throw new ApiError(400, 'Blog data is required');
  const parsedBlog = JSON.parse(blog);
  const { title, subTitle, description, category, isPublished } = parsedBlog;

  if (!title || !description || !category) {
    throw new ApiError(400, 'Title, Description, and Category are required');
  }

  const imageLocalPath = req?.file?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, 'Blog image is required');
  }

  const uploadedImage = await uploadOnCloudinary(imageLocalPath);
  if (!uploadedImage?.url) {
    throw new ApiError(500, 'Image upload to Cloudinary failed');
  }

  const newBlog = await Blog.create({
    title,
    subTitle,
    description,
    category,
    isPublished,
    image: uploadedImage.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newBlog, 'Blog created successfully'));
});

// Get all blogs
export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, blogs));
});

// Get single blog by ID
export const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (!blog) throw new ApiError(404, 'Blog not found');

  res.status(200).json(new ApiResponse(200, blog));
});

// Delete blog and its comments
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) throw new ApiError(404, 'Blog not found');

  await Comment.deleteMany({ blog: id });

  res.status(200).json(new ApiResponse(200, blog, 'Blog deleted'));
});

// Toggle publish status
export const togglePublish = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const blog = await Blog.findById(id);
  if (!blog) throw new ApiError(404, 'Blog not found');

  blog.isPublished = !blog.isPublished;
  await blog.save();

  res
    .status(200)
    .json(new ApiResponse(200, blog, 'Blog publish status toggled'));
});

// Generate blog content using Gemini AI
export const generateContent = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === '') {
    throw new ApiError(400, 'Prompt is required');
  }

  try {
    const content = await main(
      `${prompt}. Generate a blog content for this topic in simple text format.
      Do not write the extra initials , directly start the  main content
      You are an expert blog writer with a clear, engaging, and informative style. 
      Only produce well-structured, original blog posts based on the user’s topic.
      Make sure each post has an introduction, several logically ordered sections, 
      a conclusion, and actionable takeaways. Use simple language, relevant examples,
      and avoid fluff. Keep friendly, motivating tone and ask the user for subsription
      and writing comments, If Initial Prompt is not meanifull and seems invalid, or if 
      if there is no proper content then simply provide with inablity to provide for this`
    );

    return res
      .status(200)
      .json(new ApiResponse(200, content, 'Content generated successfully'));
  } catch (error) {
    throw new ApiError(500, 'AI content generation failed');
  }
});