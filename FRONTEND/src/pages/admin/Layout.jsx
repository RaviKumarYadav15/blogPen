import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar';
import { adminLogout } from '../../features/admin/admin.slice.js';
import { useDispatch } from 'react-redux';
const Layout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = ()=>{
        dispatch(adminLogout());
        navigate('/');
    }
  return (
    <>
        {/* Navigation bar */}
        <div className='flex justify-between items-center py-2 px-4 sm:px-12 border-b border-gray-200 h-[70px]'>
            <img 
                src={assets.logo} 
                alt="" 
                className='w-32 sm:w-40 cursor-pointer' 
                onClick={()=>navigate('/')}
            />

            <button onClick={logout} className='text-sm bg-blue-600 py-2 px-8 rounded-full cursor-pointer text-white'>Logout</button>


        </div>

        {/* Sidebar */}
        <div className='flex'>
            <Sidebar/>
            <Outlet/>
        </div>

    </>
  )
}
export default Layout