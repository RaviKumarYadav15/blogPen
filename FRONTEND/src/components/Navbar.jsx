import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.admin);

  console.log(isLoggedIn)

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      <button
        onClick={() => navigate(isLoggedIn ? '/admin' : '/admin-login')}
        className="flex items-center justify-center gap-2 text-sm rounded-full px-10 py-2.5 cursor-pointer bg-[#5044E5] text-white"
      >
        {isLoggedIn ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;