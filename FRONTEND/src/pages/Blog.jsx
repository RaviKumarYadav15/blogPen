import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getBlogById } from "../features/blog/blog.thunk";
import { clearCurrentBlog } from "../features/blog/blog.slice";

import { addCommentThunk, fetchCommentsByBlog } from "../features/comments/comments.thunk";
import { assets } from "../assets/assets";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentBlog, loading: blogLoading } = useSelector((state) => state.blog);
  const { blogComments, loading: commentLoading } = useSelector((state) => state.comment);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getBlogById(id));
    dispatch(fetchCommentsByBlog(id));

    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [dispatch, id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!name || !content) return;

    try {
      await dispatch(addCommentThunk({ name, content, blogId: id })).unwrap();

      setName("");
      setContent("");
      dispatch(fetchCommentsByBlog(id));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };


  if (blogLoading || commentLoading || !currentBlog) {
    return <Loader />;
  }
  // note: take care here loading ==false does not gurantee 
  // current Blog is availble so check before rendring


  return (
    <div className="relative min-h-screen bg-white text-black">
      <Navbar />

      {/* Blog Content */}
      <div className="backdrop-blur-xl relative max-w-3xl mx-auto p-5 mt-10 rounded-lg shadow-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentBlog.title}</h1>
        <p className="text-gray-700 text-sm mb-5">
          By <span className="font-semibold">Raviii</span> •{" "}
          {Moment(currentBlog.createdAt).format("MMMM Do, YYYY")}
        </p>

        {currentBlog.image && (
          <img
            src={currentBlog.image}
            alt={currentBlog.title}
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
        )}

        <div
          className="text-gray-600 leading-relaxed space-y-3"
          dangerouslySetInnerHTML={{ __html: currentBlog.description }}
        />
      </div>

      {/* Comment Section */}
      <div className="flex flex-col p-6 sm:p-10 mt-10 gap-10">

        {/* Comments List */}
        <div className="flex-1 max-w-xl min-w-lg mx-auto bg-gradient-to-t from-gray-500 via-gray-600 to-gray-900  text-white p-6 rounded-xl shadow-lg">
          <p className="text-xl font-semibold mb-4 border-b pb-2">
            Comments ({blogComments.length})
          </p>

          <div className="flex flex-col gap-4">
            {blogComments.map((item, index) => (
              <div
                key={item._id || index}
                className="relative bg-white border p-4 rounded-lg text-gray-700 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="user" className="w-6 h-6 rounded-full" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm ml-8">{item.content}</p>
                <span className="absolute right-4 bottom-3 text-xs text-gray-400">
                  {Moment(item.createdAt).fromNow()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Form */}
        <div className="flex-1 max-w-xl min-w-lg mx-auto bg-gradient-to-br from-black via-gray-800 to-blue-900  text-white p-6 rounded-xl shadow-lg">
          <p className="text-xl font-semibold mb-4 border-b  pb-2">
            Add your Comment
          </p>

          <form
            onSubmit={handleAddComment}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded-md bg-transparent border border-gray-500 placeholder-gray-300 text-white outline-none"
            />
            <textarea
              placeholder="Your Comment"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-28 p-2 rounded-md bg-transparent border border-gray-500 placeholder-gray-300 text-white outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-900 px-6 py-2 rounded-md transition hover:scale-105 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Share Buttons */}
      <div className=" flex flex-col items-center my-24 max-w-xl mx-auto">
        <p className="font-semibold my-4 text-black">
          Share this article on Social Media
        </p>
        <div className="flex gap-4 cursor-pointer">
          <img src={assets.facebook_icon} width={50} alt="Facebook" />
          <img src={assets.twitter_icon} width={50} alt="Twitter" />
          <img src={assets.googleplus_icon} width={50} alt="Google Plus" />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Blog;