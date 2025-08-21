// src/store/slice/admin/admin.thunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

// 1.Admin Login
export const adminLoginThunk = createAsyncThunk(
  'admin/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/admin/login', { email, password });

      toast.success('Admin logged in successfully');
      return res.data?.data; //this is token returned
    } catch (error) {
      const msg = error?.response?.data?.message || 'Login failed';
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);
export const verifyAdminThunk = createAsyncThunk(
  'admin/verifyAdmin',
  async(_,{getState, rejectWithValue})=>{
    try {
      const token = getState().admin.token;
      const res = await axiosInstance.get('/admin/verify',{
        headers:{
          Authorization : `Bearer ${token}`,
        }
      })
      return res.data.success;
    } catch (error) {
      const msg = error?.response?.data?.message || 'Unauthorised';
      return rejectWithValue(msg);
    }
  }
)

// 3.Get Dashboard Data
export const getDashboardThunk = createAsyncThunk(
  'admin/getDashboard',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().admin.token;

      const res = await axiosInstance.get('/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data?.data; //contains { blogs, comments, drafts, recentBlogs }
    } catch (error) {
      const msg = error?.response?.data?.message || 'Failed to fetch dashboard data';

      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);
