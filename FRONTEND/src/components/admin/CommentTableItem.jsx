import React from 'react';
import { assets } from '../../assets/assets'; 
import { useDispatch } from 'react-redux';

import { toggleCommentApproval,deleteComment } from '../../features/comments/comments.thunk';

const CommentTableItem = ({ comment, fetchComments }) => {
  const dispatch = useDispatch();
  const { blog, createdAt, _id, name, content, isApproved } = comment;
  const BlogDate = new Date(createdAt);

  const handleApproveToggle = async() => {
    await dispatch(toggleCommentApproval(_id));
    fetchComments();
  };

  const handleDelete = async() => {
    await dispatch(deleteComment(_id));
    fetchComments();
  };

  return (
    <tr className="border-y border-gray-300">
      {/* Blog & Comment Info */}
      <td className="px-6 py-3">
        <b>Blog</b>: {blog.title}
        <br />
        <b>Name</b>: {name}
        <br />
        <b>Comment</b>: {content}
      </td>

      {/* Date */}
      <td className="px-6 py-3 max-sm:hidden">{BlogDate.toDateString()}</td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {!isApproved ? (
            <img
              src={assets.tick_icon}
              alt="approve"
              onClick={handleApproveToggle}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          {/* Delete */}
          <img
            src={assets.bin_icon}
            alt="delete"
            onClick={handleDelete}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
