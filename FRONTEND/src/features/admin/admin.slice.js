import { createSlice } from '@reduxjs/toolkit';
import { adminLoginThunk,verifyAdminThunk, getDashboardThunk } from './admin.thunk';

const initialState = {
  token: localStorage.getItem('admin_token') || null,
  isLoggedIn: !!localStorage.getItem('admin_token'),
  loading: false,
  error: null,
  dashboard: {
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLogout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.dashboard = initialState.dashboard;
      localStorage.removeItem('admin_token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isLoggedIn = true;
        localStorage.setItem('admin_token', action.payload);
      })
      .addCase(adminLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyAdminThunk.pending,(state)=>{
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAdminThunk.fulfilled,(state,action)=>{
        state.loading = false;
        state.isLoggedIn = action.payload;
      })
      .addCase(verifyAdminThunk.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })


      .addCase(getDashboardThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getDashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { adminLogout } = adminSlice.actions;
export default adminSlice.reducer;