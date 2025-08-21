import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentThunk,
  fetchAllComments,
  fetchCommentsByBlog,
  toggleCommentApproval,
  deleteComment
} from "./comments.thunk.js";

const initialState = {
  allComments: [],
  blogComments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Add comment
      .addCase(addCommentThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCommentThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCommentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get all comments
      .addCase(fetchAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.allComments = action.payload;
      })
      .addCase(fetchAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get comments by blog
      .addCase(fetchCommentsByBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogComments = action.payload;
      })
      .addCase(fetchCommentsByBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle approval
      .addCase(toggleCommentApproval.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.allComments.findIndex((c) => c._id === updated._id);
        if (index !== -1) state.allComments[index] = updated;
      })

      // Delete comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.allComments = state.allComments.filter((c) => c._id !== action.payload);
      });
  }
});

export default commentSlice.reducer;
