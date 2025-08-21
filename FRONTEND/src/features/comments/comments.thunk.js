import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

// 1. Add a comment (public)
export const addCommentThunk = createAsyncThunk(
  "comment/addComment",
  async ({ name, content, blogId }, {rejectWithValue}) => {
    try {
      const res = await axiosInstance.post("/comment", { name, content, blogId });
      toast.success(res.data.message || "Comment submitted");
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add comment");
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

// 2. Fetch all comments (admin only - token required)
export const fetchAllComments = createAsyncThunk(
  "comment/fetchAllComments",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axiosInstance.get("/comment/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      toast.error("Failed to fetch comments");
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

// 3. Fetch comments by blog (public)
export const fetchCommentsByBlog = createAsyncThunk(
  "comment/fetchCommentsByBlog",
  async (blogId, {rejectWithValue}) => {
    try {

      const res = await axiosInstance.get(`/comment/blog/${blogId}`);
      return res.data.data;
    } catch (error) {

      toast.error("Failed to fetch comments for blog");
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

// 4. Toggle comment approval (admin only - token required)
export const toggleCommentApproval = createAsyncThunk(
  "comment/toggleCommentApproval",
  async (commentId, { getState, rejectWithValue }) => {
    try {

      const token = getState().admin.token;
      const res = await axiosInstance.post(`/comment/approve`,{id:commentId},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Status updated");
      return res.data.data;
    } catch (error) {

      toast.error("Failed to update status");
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);

// 5. Delete comment 
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId, { getState, rejectWithValue }) => {
    try {

      const token = getState().admin.token;
      const res = await axiosInstance.delete(`/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || "Comment deleted");
      return commentId;
    } catch (error) {

      toast.error("Failed to delete comment");
      return rejectWithValue(error?.response?.data?.message || "Something went wrong");
    }
  }
);