import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaBed,
  FaEye,
  FaDownload,
  FaCheck,
  FaTimes,
  FaClock,
  FaSearch
} from 'react-icons/fa';
import {
  Booking,
  RoomAvailability,
  FlatStatus,
  calculateRoomAvailability,
  getFlatStatuses,
  getNextAvailableFlat
} from '../../utils/roomManagement';

const AdminBookings: React.FC = () => {

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      orderId: 'order_1751883838324',
      customerName: 'Siva Prathap Ugrarapu',
      customerEmail: 'mg8751721@gmail.com',
      customerPhone: '+91 6309599582',
      roomType: '2bhk',
      roomTitle: '2-BHK Apartment',
      flatNumber: '202',
      checkIn: '2025-07-08',
      checkOut: '2025-07-09',
      guests: 2,
      totalAmount: 4479,
      paymentStatus: 'PAID',
      bookingStatus: 'CONFIRMED',
      bookingDate: '2025-07-07',
      specialRequests: 'Early check-in if possible'
    },
    {
      id: '2',
      orderId: 'order_1751880488048',
      customerName: 'Simha Teja Ugrarapu',
      customerEmail: 'couture.founders@gmail.com',
      customerPhone: '+91 6301658275',
      roomType: '1bhk',
      roomTitle: '1-BHK Apartment',
      flatNumber: '104',
      checkIn: '2025-07-10',
      checkOut: '2025-07-11',
      guests: 2,
      totalAmount: 3359,
      paymentStatus: 'PAID',
      bookingStatus: 'UPCOMING',
      bookingDate: '2025-07-07'
    },
    {
      id: '3',
      orderId: 'order_1751875234567',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+91 9876543210',
      roomType: 'standard',
      roomTitle: 'Standard Room',
      flatNumber: '301',
      checkIn: '2025-07-05',
      checkOut: '2025-07-06',
      guests: 1,
      totalAmount: 2239,
      paymentStatus: 'PAID',
      bookingStatus: 'COMPLETED',
      bookingDate: '2025-07-04'
    }
  ]);

  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');

  useEffect(() => {
    let filtered = bookings;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.orderId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(booking => booking.bookingStatus === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== 'ALL') {
      filtered = filtered.filter(booking => booking.paymentStatus === paymentFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, paymentFilter]);

  // Calculate room availability based on current bookings
  const calculateRoomAvailabilityLocal = useCallback((): RoomAvailability => {
    return calculateRoomAvailability(bookings);
  }, [bookings]);

  // Get flat status for each flat
  const getFlatStatusesLocal = useCallback((): FlatStatus[] => {
    return getFlatStatuses(bookings);
  }, [bookings]);

  const [roomAvailability, setRoomAvailability] = useState<RoomAvailability>(calculateRoomAvailability(bookings));
  const [flatStatuses, setFlatStatuses] = useState<FlatStatus[]>(getFlatStatuses(bookings));

  // Update availability when bookings change
  useEffect(() => {
    setRoomAvailability(calculateRoomAvailabilityLocal());
    setFlatStatuses(getFlatStatusesLocal());
  }, [bookings, calculateRoomAvailabilityLocal, getFlatStatusesLocal]);

  // Helper function to get next available flat
  const getNextAvailableFlatLocal = useCallback((): string | null => {
    return getNextAvailableFlat(bookings);
  }, [bookings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'UPCOMING':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'PAID':
        return <FaCheck className="text-green-600" />;
      case 'PENDING':
        return <FaClock className="text-yellow-600" />;
      case 'FAILED':
      case 'CANCELLED':
        return <FaTimes className="text-red-600" />;
      default:
        return <FaClock className="text-blue-600" />;
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: string) => {
    setBookings(bookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, bookingStatus: newStatus as any }
        : booking
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Booking Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Booking Status</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            {/* Payment Status Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Payment Status</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>

            {/* Export Button */}
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <FaDownload />
              <span>Export CSV</span>
            </button>

            {/* Available Rooms Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <div className="text-xs text-blue-600 font-medium">Next Available:</div>
              <div className="text-sm font-bold text-blue-800">
                {getNextAvailableFlatLocal() || 'No flats available'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <FaBed className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="text-blue-600 text-2xl mr-3">2B</div>
              <div>
                <p className="text-gray-600 text-sm">Available 2BHK</p>
                <p className="text-2xl font-bold text-gray-900">{roomAvailability['2bhk']}/12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="text-green-600 text-2xl mr-3">1B</div>
              <div>
                <p className="text-gray-600 text-sm">Available 1BHK</p>
                <p className="text-2xl font-bold text-gray-900">{roomAvailability['1bhk']}/12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="text-purple-600 text-2xl mr-3">S</div>
              <div>
                <p className="text-gray-600 text-sm">Available Standard</p>
                <p className="text-2xl font-bold text-gray-900">{roomAvailability['standard']}/12</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="text-green-600 text-2xl mr-3">₹</div>
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{bookings.filter(b => b.paymentStatus === 'PAID').reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Flat Status Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Flat Status Overview</h3>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3].map(floor => (
              <div key={floor} className="col-span-4">
                <h4 className="text-md font-medium text-gray-700 mb-2">Floor {floor}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {flatStatuses.filter(flat => flat.floor === floor).map(flat => (
                    <div
                      key={flat.flatNumber}
                      className={`p-3 rounded-lg border-2 text-center ${
                        flat.isOccupied
                          ? 'bg-red-100 border-red-300 text-red-800'
                          : 'bg-green-100 border-green-300 text-green-800'
                      }`}
                    >
                      <div className="font-bold">{flat.flatNumber}</div>
                      <div className="text-xs">
                        {flat.isOccupied ? (
                          <>
                            <div>{flat.bookingType?.toUpperCase()}</div>
                            <div className="truncate">{flat.bookedBy}</div>
                          </>
                        ) : (
                          'Available'
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room & Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          #{booking.orderId.slice(-8)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center">
                          <FaUser className="text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900">
                            {booking.customerName}
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <FaEnvelope className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                        </div>
                        <div className="flex items-center mt-1">
                          <FaPhone className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center">
                          <FaBed className="text-gray-400 mr-2" />
                          <div className="text-sm font-medium text-gray-900">
                            {booking.roomTitle}
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="text-sm font-medium text-blue-600">
                            Flat: {booking.flatNumber}
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          <FaCalendarAlt className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-500">
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.guests} Guest{booking.guests > 1 ? 's' : ''}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          ₹{booking.totalAmount.toLocaleString()}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.paymentStatus)}`}>
                          {getStatusIcon(booking.paymentStatus)}
                          <span className="ml-1">{booking.paymentStatus}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.bookingStatus)}`}>
                        {getStatusIcon(booking.bookingStatus)}
                        <span className="ml-1">{booking.bookingStatus}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <FaEye />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <FaDownload />
                        </button>
                        {booking.bookingStatus === 'UPCOMING' && (
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'CONFIRMED')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <FaCheck />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
