import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

// 1. Add Blog
export const addBlog = createAsyncThunk(
  'blog/addBlog',
  async ({ blog, file }, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('file', file);

      const res = await axiosInstance.post('/blog/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ Blog added successfully!");
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to add blog';
      toast.error(`❌ ${msg}`);
      return rejectWithValue(msg);
    }
  }
);

// 2. Fetch All Blogs
export const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axiosInstance.get('/blog', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch blogs';
      toast.error(`❌ ${msg}`);
      return rejectWithValue(msg);
    }
  }
);

export const fetchBlogsAdmin = createAsyncThunk(
  'blog/fetchBlogsAdmin',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axiosInstance.get('/blog/admin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch blogs';
      toast.error(`❌ ${msg}`);
      return rejectWithValue(msg);
    }
  }
);

// 3. Get Blog by ID
export const getBlogById = createAsyncThunk(
  'blog/getBlogById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axiosInstance.get(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to fetch blog';
      toast.error(`❌ ${msg}`);
      return rejectWithValue(msg);
    }
  }
);

// 4. Delete Blog
export const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      await axiosInstance.delete(`/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🗑️ Blog deleted successfully!");
      return { id }; // return only the id so it can be filtered out later
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete blog';
      toast.error(`❌ ${msg}`);
      return rejectWithValue(msg);
    }
  }
);

// 5. Toggle Publish Status
export const togglePublish = createAsyncThunk(
  'blog/togglePublish',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axiosInstance.post(`/blog/toggle`, { id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✅ Blog status updated!");
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to toggle publish';
      toast.error(`❌ ${msg}`);
      return rejectWithValue(msg);
    }
  }
);

// 6. Generate AI Blog Content
export const generateContentThunk = createAsyncThunk(
  'blog/generateContent',
  async (prompt, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axiosInstance.post(`/blog/generate`, { prompt }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("✨ Blog content generated!");
      return res.data.data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to generate content";
      toast.error(`❌ ${msg}`);
      return rejectWithValue(msg);
    }
  }
);
