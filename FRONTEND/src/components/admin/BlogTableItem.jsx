import React from 'react';
import { assets } from '../../assets/assets';
import { useDispatch } from 'react-redux';
import { deleteBlog, togglePublish } from '../../features/blog/blog.thunk';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { _id, title, createdAt, isPublished } = blog;
  const dispatch = useDispatch();
  const blogDate = new Date(createdAt);

  const handlePublishToggle = async () => {
    await dispatch(togglePublish(_id));
    await dispatch(fetchBlogs());
  };
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await dispatch(deleteBlog(_id));
      await dispatch(fetchBlogs());
    }
  };

  return (
    <tr className="border-y border-gray-300">
      {/* Serial Number */}
      <th scope="row" className="px-2 py-4">{index}</th>

      {/* Blog Title */}
      <td className="px-2 py-4">{title}</td>

      {/* Created Date */}
      <td className="px-2 py-4 max-sm:hidden">{blogDate.toDateString()}</td>

      {/* Publish Status */}
      <td className="px-2 py-4 max-sm:hidden">
        <p className={isPublished ? "text-green-600" : "text-orange-700"}>
          {isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>

      {/* Actions */}
      <td className="px-2 py-4">
        <div className="inline-flex text-xs gap-3">
          <button
            onClick={handlePublishToggle}
            className="border w-20 px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-gray-100"
          >
            {isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <img
            src={assets.cross_icon}
            alt="delete"
            onClick={handleDelete}
            className="w-8 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
      
    </tr>
    
  );
};

export default BlogTableItem;
