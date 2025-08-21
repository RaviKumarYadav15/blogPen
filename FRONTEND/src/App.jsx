import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import Blog from './pages/Blog';

import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import AddBlog from './pages/admin/AddBlog';
import ListBlog from './pages/admin/ListBlog';
import Comments from './pages/admin/Comments';
import Login from './components/admin/Login';

import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { verifyAdminThunk } from './features/admin/admin.thunk';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.admin);

  useEffect(()=>{
    dispatch(verifyAdminThunk());
  },[dispatch])

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin-login" element={<Login />} />

        {isLoggedIn ? (
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="addBlog" element={<AddBlog />} />
            <Route path="listBlog" element={<ListBlog />} />
            <Route path="comments" element={<Comments />} />
          </Route>
        ) : (
          // Redirect to home if not logged in
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </>
  );
};

export default App;
