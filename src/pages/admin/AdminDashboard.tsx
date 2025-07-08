import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaUsers, 
  FaRupeeSign,
  FaBed,
  FaChartLine,
  FaClock,
  FaCheckCircle
} from 'react-icons/fa';

const AdminDashboard: React.FC = () => {
  // Mock data for dashboard stats
  const stats = {
    totalRooms: 12,
    occupiedRooms: 8,
    availableRooms: 4,
    totalBookings: 45,
    todayCheckIns: 3,
    todayCheckOuts: 2,
    totalRevenue: 125000,
    monthlyRevenue: 45000
  };

  const recentBookings = [
    { id: 1, guest: 'John Doe', room: '2BHK - 101', checkIn: '2025-07-08', status: 'confirmed' },
    { id: 2, guest: 'Jane Smith', room: '1BHK - 203', checkIn: '2025-07-09', status: 'pending' },
    { id: 3, guest: 'Mike Johnson', room: 'Standard - 305', checkIn: '2025-07-10', status: 'confirmed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening at Akkshara Hotel.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Rooms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <FaBed className="text-blue-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600 text-sm">Total Rooms</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalRooms}</p>
              </div>
            </div>
          </motion.div>

          {/* Occupied Rooms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <FaCheckCircle className="text-green-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600 text-sm">Occupied</p>
                <p className="text-3xl font-bold text-gray-900">{stats.occupiedRooms}</p>
              </div>
            </div>
          </motion.div>

          {/* Available Rooms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <FaHome className="text-yellow-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600 text-sm">Available</p>
                <p className="text-3xl font-bold text-gray-900">{stats.availableRooms}</p>
              </div>
            </div>
          </motion.div>

          {/* Total Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <FaRupeeSign className="text-purple-600 text-3xl mr-4" />
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <FaCalendarAlt className="text-indigo-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <FaClock className="text-orange-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Today Check-ins</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayCheckIns}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center">
              <FaChartLine className="text-red-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Bookings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FaUsers className="text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{booking.guest}</p>
                      <p className="text-sm text-gray-600">{booking.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Check-in: {booking.checkIn}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
