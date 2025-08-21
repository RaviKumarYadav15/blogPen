import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginThunk } from '../../features/admin/admin.thunk';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isLoggedIn } = useSelector((state) => state.admin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Email and Password are required");
    }
    dispatch(adminLoginThunk({ email, password }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='flex-col'>
      <img
              onClick={() => navigate('/')}
              src={assets.logo}
              alt="logo"
              className="w-50 sm:w-44 cursor-pointer m-auto pt-5"
      />
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 md:m-6 border border-blue-800/30 shadow-xl shadow-blue-800/15 rounded-lg">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-blue-800">Admin </span>
              Login
            </h1>
            <p className="font-light">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email id"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                // required
                className="p-2 mb-6 outline-none border-b-2 border-gray-300"
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                // required
                className="p-2 mb-6 outline-none border-b-2 border-gray-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded font-medium text-white ${
                loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
              } transition-all`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;