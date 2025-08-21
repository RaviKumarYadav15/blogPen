import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useDispatch } from 'react-redux';
import { setSearchInput } from '../features/blog/blog.slice'; // Make sure this exists

const Header = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(input));
  };

  return (
    <div className='relative mx-8 sm:mx-16 xl:mx-24'>
      <div className='text-center mt-10 mb-8'>
        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-[#5044E5]/40 bg-[#5044E5]/10 rounded-full text-sm text-[#5044E5]'>
          <p>New AI feature integrated</p>
          <img src={assets.star_icon} alt="star-icon" className='w-4' />
        </div>

        <h1 className='text-3xl font-semibold text-gray-700'>
          Your own <span className='text-[#5044E5]'>blogging</span> <br /> platform.
        </h1>

        <p className='my-6 m-auto max-w-2xl'>
          This is your space to think out loud, to share what matters, and to write without filters.
          Whether it's one word or a thousand, your story starts right here.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className='flex justify-between max-w-lg mx-auto border border-gray-300 bg-white rounded overflow-hidden'
        >
          <input
            type="text"
            placeholder="Search for blogs"
            className='w-full outline-none pl-4'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className='bg-[#5044E5] text-white rounded px-8 py-2 m-1 cursor-pointer hover:scale-102 transition-all'
          >
            Search
          </button>
        </form>
      </div>

      <div className='text-center'>
        {
          input && (
            <button
              onClick={() => {
                setInput('');
                dispatch(setSearchInput(''));
              }}
              className='border rounded py-1 px-3 font-light text-xs shadow-lg cursor-pointer'
            >
              Clear Search
            </button>
          )
        }

      </div>

      <img src={assets.gradientBackground} alt='header-background' className='absolute -top-12 -z-10 opacity-60' />
    </div>
  );
};

export default Header;