import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsAdmin } from '../../features/blog/blog.thunk.js';
import BlogTableItem from '../../components/admin/BlogTableItem';
import Loader from '../../components/Loader.jsx';

const ListBlog = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchBlogsAdmin());
  }, [dispatch]);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="text-xl font-semibold mb-4">All Blogs</h1>

      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white scrollbar-hide">
        {loading ? (
          <div className="flex justify-center items-center p-6">
            <Loader />
          </div>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                <th scope="col" className="px-2 py-4">Blog Title</th>
                <th scope="col" className="px-2 py-4 mx-sm:hidden">Date</th>
                <th scope="col" className="px-2 py-4 mx-sm:hidden">Status</th>
                <th scope="col" className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id || index}
                  blog={blog}
                  fetchBlogs={fetchBlogsAdmin}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default ListBlog;