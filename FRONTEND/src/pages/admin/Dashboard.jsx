import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardThunk } from '../../features/admin/admin.thunk';
import Loader from '../../components/Loader'

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardThunk());
  }, [dispatch]);


  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Overview cards */}
      <div className="flex flex-wrap gap-4">
        <DashboardCard
          icon={assets.dashboard_icon_1}
          label="Blogs"
          value={dashboard.blogs}
        />
        <DashboardCard
          icon={assets.dashboard_icon_2}
          label="Comments"
          value={dashboard.comments}
        />
        <DashboardCard
          icon={assets.dashboard_icon_3}
          label="Drafts"
          value={dashboard.drafts}
        />
      </div>

      {/* Latest Blogs */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="Latest Blogs" />
          <p>Latest Blogs</p>
        </div>
        {
          loading ?
            <div className="flex justify-center items-center py-10">
              <Loader />
            </div> :

            <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg bg-white scrollbar-hide">
              <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-gray-600 text-left uppercase">
                  <tr>
                    <th className="px-2 py-4 xl:px-6">#</th>
                    <th className="px-2 py-4">Blog Title</th>
                    <th className="px-2 py-4 max-sm:hidden">Date</th>
                    <th className="px-2 py-4 max-sm:hidden">Status</th>
                    <th className="px-2 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.recentBlogs?.length > 0 ? (
                    dashboard.recentBlogs.map((blog, index) => (
                      <BlogTableItem
                        key={blog._id}
                        blog={blog}
                        index={index + 1}
                        fetchBlogs={getDashboardThunk}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-6 text-gray-400">
                        No recent blogs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
        }
      </div>

      <p className="text-xs text-gray-500 mt-2">
        <span className="font-semibold">Note:</span> Drafts indicate the number of unpublished blogs.
      </p>
    </div>
  );
};
const DashboardCard = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white p-4 min-w-60 rounded shadow cursor-pointer hover:scale-105 transition-all">
    <img src={icon} alt={label} />
    <div>
      <p className="text-xl font-semibold text-gray-600">{value ?? 0}</p>
      <p className="text-gray-400 font-light">{label}</p>
    </div>
  </div>
);

export default Dashboard;