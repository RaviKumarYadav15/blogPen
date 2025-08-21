import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllComments } from '../../features/comments/comments.thunk';
import CommentTableItem from '../../components/admin/CommentTableItem';
import Loader from '../../components/Loader';

const Comments = () => {
  const dispatch = useDispatch();
  const { allComments, loading } = useSelector((state) => state.comment);

  const [filter, setFilter] = useState('Approved');

  useEffect(() => {

    dispatch(fetchAllComments());
  }, [dispatch]);

  const filteredComments = allComments?.filter((comment) =>
    filter === 'Approved' ? comment.isApproved : !comment.isApproved
  );

  const notApprovedCount = allComments?.filter((c) => !c.isApproved).length;

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* Header Section */}
      <div className="flex justify-between items-center max-w-3xl">
        <h1 className="text-lg font-semibold text-gray-700">Comments</h1>
        <div className="flex gap-4">
          {/* Approved Button */}
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs relative ${filter === 'Approved' ? 'text-blue-800' : 'text-gray-700'
              }`}
          >
            Approved
          </button>

          {/* Not Approved Button with Badge */}
          <div className="relative">
            <button
              onClick={() => setFilter('Not Approved')}
              className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs relative ${filter === 'Not Approved' ? 'text-blue-800' : 'text-gray-700'
                }`}
            >
              Not Approved
            </button>

            {notApprovedCount > 0 && (
              <span className="absolute -top-2 -right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-bold rounded-full px-2 py-[2px]">
                {notApprovedCount}
              </span>
            )}

          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        {loading ? (
          <Loader/>
        ) : filteredComments?.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No comments found.</div>
        ) : (
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-700 text-left uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Blog Title & Comments
                </th>
                <th scope="col" className="px-6 py-3 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>

              {filteredComments.map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={() => dispatch(fetchAllComments())}
                />

              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Comments;