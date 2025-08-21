import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { title, description, image, category, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full max-w-sm bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      {/* Blog Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        {/* Category */}
        <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-[#5044E5] bg-[#5044E5]/10 rounded-full">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {title.length > 60 ? `${title.slice(0, 60)}...` : title}
        </h3>

        {/* Description Preview */}
        <p
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 100) + (description.length > 100 ? '...' : ''),
          }}
        />
      </div>
    </div>
  );
};

export default BlogCard;
