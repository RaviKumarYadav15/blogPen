import React, { useEffect, useRef, useState } from 'react';
import { assets, blogCategories } from '../../assets/assets';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, generateContentThunk } from '../../features/blog/blog.thunk';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { parse } from 'marked';
import Loader from '../../components/Loader';

const AddBlog = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  const [generating, setGenerating] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const { loading } = useSelector((state) => state.blog);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const description = quillRef.current?.root?.innerHTML || '';

    if (!title || !subTitle || !description || !category || !image) {
      toast.error('Please fill in all fields');
      return;
    }

    const blog = {
      title,
      subTitle,
      description,
      category,
      isPublished,
    };

    try {
      await dispatch(addBlog({ blog, file: image })).unwrap();

      // reset the state
      setImage(null);
      setTitle('');
      setSubTitle('');
      quillRef.current.setText('');
      setHasContent(false);
      setCategory('Select Category');
      setIsPublished(false);

      navigate('/admin/listBlog');
    } catch (error) {
      console.error('Blog creation failed:', error);
    }
  };

const handleGenerateContent = async () => {

  if (!title) {
    toast.info('⚠️ Please enter a title for Blog');
    return;
  }

  if (quillRef.current) {
    quillRef.current.setText('');
    setHasContent(false);
  }

  try {
    setGenerating(true);
    const content = await dispatch(generateContentThunk(title)).unwrap();
    const html = parse(content || '');
    setHasContent(html.length>0);

    // // Directly set HTML without DOMPurify (⚠️ use only if content is trusted)
    // NOTE: this does not give the blog properly
    // if (quillRef.current?.root) {
    //   quillRef.current.root.innerHTML = html;
    //   setEditorContent(quillRef.current.getText().trim());
    // }

    if (quillRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(html);
      // setEditorContent(quillRef.current.getText().trim());
    }
  } catch (error) {
    console.error('AI content generation failed:', error);
  } finally {
    setGenerating(false);
  }
};
  useEffect(() => {
    // initiallise quill only once
    if (!quillRef.current && editorRef.current) {
      
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              //NOTE:module is added to Do NOT include 'formula'
            ]
          }
      });
      
      quillRef.current.on('text-change', () => {
        const text = quillRef.current.getText().trim();
        setHasContent(text.length>0);
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        {/* Upload Thumbnail */}
        <p className="font-medium text-gray-700">Upload Thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="coverImage"
            className="mt-2 h-16 rounded cursor-pointer object-cover"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
        </label>

        {/* Blog Title */}
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        {/* Sub Title */}
        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        {/* Blog Description */}
        <p className="mt-2">Blog Description</p>

        <div className="w-full max-w-3xl p-3 pb-5 sm:pb-10 pt-2 rounded">
          {generating && <Loader />}

          {/* Quill Editor */}
          <div
            ref={editorRef}
            className={`min-h-50 ${generating ? 'hidden' : ''}`}
          />

          {/* Button Container */}
          <div className="flex flex-wrap justify-between items-center mt-4 p-2 rounded">
            <button
              type="button"
              onClick={handleGenerateContent}
              disabled={generating}
              className="w-fit px-4 py-2 bg-gradient-to-br from-orange-500 via-gray-200 to-green-500
                text-blue-600 font-semibold text-xs rounded 
                hover:opacity-90 hover:scale-105 
                transition-all duration-300 ease-in-out 
                cursor-pointer shadow-lg disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate with AI'}
            </button>

            {hasContent && (
              <button
                type="button"
                onClick={() => {
                  quillRef.current?.setText('');
                  setHasContent(false);
                }}
                className="w-fit px-4 py-2 bg-gradient-to-br from-gray-900 via-gray-600 to-gray-950
                  text-white text-xs rounded hover:scale-105 
                  transition-all duration-300 ease-out 
                  cursor-pointer shadow-lg"
              >
                Clear Content
              </button>
            )}
          </div>
        </div>

        {/* Blog Category */}
        <p className="mt-2">Blog Category</p>
        <select
          name="category"
          className="mt-2 px-3 py-2 border border-gray-300 text-gray-500 outline-none rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        {/* Publish Toggle */}
        <div className="flex gap-2 mt-4 items-center">
          <p>Publish Now</p>
          <input
            type="checkbox"
            checked={isPublished}
            className="hover:scale-125 cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-40 h-10 bg-blue-600 text-white rounded cursor-pointer text-sm hover:bg-blue-800 transition-all"
        >
          {loading ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;