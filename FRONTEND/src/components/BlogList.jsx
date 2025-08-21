import React, { useEffect, useState } from 'react';
import { blogCategories } from '../assets/assets';
import BlogCard from './BlogCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../features/blog/blog.thunk';

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error, search } = useSelector((state) => state.blog);

  const [menu, setMenu] = useState('All');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // Fetch blogs when component loads
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  useEffect(() => {
    const trimmedSearch = search?.trim().toLowerCase() || '';

    const filtered = blogs?.filter((blog) => {
      const title = blog?.title?.toLowerCase() || '';
      const category = blog?.category?.toLowerCase() || '';

      const matchesMenu = menu === 'All' || category === menu.toLowerCase();
      const matchesSearch =
        trimmedSearch === '' ||
        title.includes(trimmedSearch) ||
        category.includes(trimmedSearch);

      const isPublished = blog?.isPublished;

      return isPublished && matchesMenu && matchesSearch;
    }) || [];

    setFilteredBlogs(filtered);
    setNoResults(!loading && !error && filtered.length === 0);
  }, [search, blogs, menu, loading, error]);

  return (
    <div>
      {/* Blog Menu */}
      <div className='flex justify-center gap-4 my-10 relative flex-wrap'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 transition-all duration-200 ${
                menu === item ? 'text-white px-4 pt-0.5' : ''
              }`}
            >
              {item}
              {menu === item && (
                <div className='absolute bg-[#5044E5] rounded-full -z-1 h-7 left-0 right-0 top-0'></div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {loading ? (
          <p className='col-span-full text-center'>Loading blogs...</p>
        ) : error ? (
          <p className='col-span-full text-center text-red-500'>Reload the page again</p>
        ) : noResults ? (
          <p className='col-span-full text-center text-gray-400'>No blogs found for your search</p>
        ) : (
          filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        )}
      </div>
    </div>
  );
};
export default BlogList;