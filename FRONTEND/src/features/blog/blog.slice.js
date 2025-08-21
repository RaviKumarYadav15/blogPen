import { createSlice } from '@reduxjs/toolkit';
import {
  addBlog,
  fetchBlogs,
  getBlogById,
  deleteBlog,
  togglePublish,
  generateContentThunk,
  fetchBlogsAdmin,
} from './blog.thunk';

const initialState = {
  blogs: [],
  search: '',
  currentBlog: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSearchInput: (state, action) => {
      state.search = action.payload;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Blog
      .addCase(addBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchBlogsAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogsAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Blog By ID
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload.id);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle Publish
      .addCase(togglePublish.pending, (state) => {
        state.loading = true;
      })
      .addCase(togglePublish.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.blogs = state.blogs.map((blog) =>
          blog._id === updated._id ? updated : blog
        );
      })
      .addCase(togglePublish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Generate Content
      .addCase(generateContentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateContentThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generateContentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearCurrentBlog,
  clearError,
  setSearchInput} = blogSlice.actions;

export default blogSlice.reducer;
