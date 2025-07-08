import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBed, 
  FaCalendarCheck, 
  FaHome,
  FaSignOutAlt,
  FaChartBar,
  FaCog
} from 'react-icons/fa';
import AdminRooms from './AdminRooms';
import AdminBookings from './AdminBookings';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: '/admin/rooms', label: 'Rooms', icon: FaBed },
    { path: '/admin/bookings', label: 'Bookings', icon: FaCalendarCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 text-white">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-xl font-bold">Akkshara Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-8">
          <div className="px-4">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
              Management
            </p>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="mr-3 text-lg" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Additional Admin Features */}
          <div className="px-4 mt-8">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
              System
            </p>
            <Link
              to="/admin/analytics"
              className="flex items-center px-4 py-3 mb-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <FaChartBar className="mr-3 text-lg" />
              <span className="font-medium">Analytics</span>
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center px-4 py-3 mb-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <FaCog className="mr-3 text-lg" />
              <span className="font-medium">Settings</span>
            </Link>
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <Link
              to="/"
              className="flex items-center px-4 py-3 mb-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <FaHome className="mr-3 text-lg" />
              <span className="font-medium">Back to Website</span>
            </Link>
            <button className="w-full flex items-center px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors">
              <FaSignOutAlt className="mr-3 text-lg" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <Routes>
          <Route path="/rooms" element={<AdminRooms />} />
          <Route path="/bookings" element={<AdminBookings />} />
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              {/* Dashboard Header */}
              <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                  <p className="text-gray-600 mt-2">Welcome to Akkshara Stay Inn Admin Portal</p>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quick Access Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      to="/admin/rooms"
                      className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaBed className="h-8 w-8 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Room Management</h3>
                          <p className="text-gray-600">Manage room types, pricing, and availability</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to="/admin/bookings"
                      className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaCalendarCheck className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">Booking Management</h3>
                          <p className="text-gray-600">View and manage all customer bookings</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>

                {/* System Info */}
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-gray-600">Active Rooms</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">3</div>
                      <div className="text-sm text-gray-600">Total Bookings</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">₹10,077</div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
