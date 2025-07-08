import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBed, 
  FaCheckCircle, 
  FaWifi, 
  FaCar, 
  FaTv, 
  FaSnowflake,
  FaUtensils,
  FaArrowLeft,
  FaCalendarAlt,
  FaUsers,
  FaExclamationTriangle
} from 'react-icons/fa';
import {
  Booking as BookingType,
  calculateRoomAvailability,
  getAvailableFlatsForDates,
  ROOM_PRICES,
  ROOM_TITLES
} from '../utils/roomManagement';

const Booking: React.FC = () => {
  const { roomType } = useParams<{ roomType: string }>();
  const navigate = useNavigate();

  // Mock bookings data (in real app, this would come from backend)
  const [bookings] = useState<BookingType[]>([
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
    }
  ]);

  const [availability, setAvailability] = useState(calculateRoomAvailability(bookings));
  const [availableFlats, setAvailableFlats] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    specialRequests: ''
  });

  // Check availability when dates change
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const flats = getAvailableFlatsForDates(formData.checkIn, formData.checkOut, bookings);
      setAvailableFlats(flats);
    }
  }, [formData.checkIn, formData.checkOut, bookings]);

  // Update availability when bookings change
  useEffect(() => {
    setAvailability(calculateRoomAvailability(bookings));
  }, [bookings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.checkIn || !formData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    // Check availability for selected dates
    if (availableFlats.length === 0) {
      alert('No rooms available for selected dates. Please choose different dates.');
      return;
    }

    // Navigate to checkout with booking data
    navigate(`/checkout/${roomType}`, {
      state: {
        ...formData,
        availableFlats: availableFlats
      }
    });
  };

  const roomData = {
    '2bhk': {
      title: ROOM_TITLES['2bhk'],
      price: `₹ ${Math.round(ROOM_PRICES['2bhk'] / 1.12).toLocaleString()}`,
      gst: '12% GST',
      totalPrice: `₹ ${ROOM_PRICES['2bhk'].toLocaleString()}`,
      description: 'Spacious and perfect for families or groups, offering a complete home-like experience with all essential facilities.',
      image: '/images/carsousel 1st.jpeg',
      features: [
        'Fully furnished apartment',
        'Complete kitchen facilities',
        'Spacious living room',
        '2 Separate bedrooms',
        'Modern amenities',
        '24/7 room service'
      ],
      amenities: [
        { icon: FaWifi, name: 'Free WiFi' },
        { icon: FaCar, name: 'Parking' },
        { icon: FaTv, name: 'Smart TV' },
        { icon: FaSnowflake, name: 'AC' },
        { icon: FaUtensils, name: 'Kitchen' }
      ],
      roomSize: '850 sq ft',
      capacity: '4-6 guests'
    },
    '1bhk': {
      title: ROOM_TITLES['1bhk'],
      price: `₹ ${Math.round(ROOM_PRICES['1bhk'] / 1.12).toLocaleString()}`,
      gst: '12% GST',
      totalPrice: `₹ ${ROOM_PRICES['1bhk'].toLocaleString()}`,
      description: 'Ideal for couples or small families seeking a cozy and private stay with all essential amenities.',
      image: '/images/1bhk.jpeg',
      features: [
        'Cozy living space',
        'Kitchen facilities',
        '1 Comfortable bedroom',
        'Private balcony',
        'Essential amenities',
        'Daily housekeeping'
      ],
      amenities: [
        { icon: FaWifi, name: 'Free WiFi' },
        { icon: FaCar, name: 'Parking' },
        { icon: FaTv, name: 'Smart TV' },
        { icon: FaSnowflake, name: 'AC' }
      ],
      roomSize: '550 sq ft',
      capacity: '2-3 guests'
    },
    'standard': {
      title: ROOM_TITLES['standard'],
      price: `₹ ${Math.round(ROOM_PRICES['standard'] / 1.12).toLocaleString()}`,
      gst: '12% GST',
      totalPrice: `₹ ${ROOM_PRICES['standard'].toLocaleString()}`,
      description: 'Comfortable and budget-friendly for solo travelers or short stays with all basic amenities.',
      image: '/images/stand.jpeg',
      features: [
        'Comfortable queen bed',
        'Private bathroom',
        'Clean amenities',
        '24/7 support',
        'Budget friendly',
        'Complimentary breakfast'
      ],
      amenities: [
        { icon: FaWifi, name: 'Free WiFi' },
        { icon: FaTv, name: 'TV' },
        { icon: FaSnowflake, name: 'AC' }
      ],
      roomSize: '300 sq ft',
      capacity: '1-2 guests'
    }
  };

  const currentRoom = roomData[roomType as keyof typeof roomData];

  if (!currentRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-cinzel text-gray-800 mb-4">Room not found</h1>
          <button
            onClick={() => navigate('/rooms')}
            className="btn-primary"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-gold-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/rooms')}
            className="flex items-center text-gold-600 hover:text-gold-700 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            <span className="font-cinzel font-medium">Back to Rooms</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Room Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={currentRoom.image}
                alt={currentRoom.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="flex items-center space-x-2">
                  <FaBed className="text-gold-600" />
                  <span className="font-cinzel font-semibold text-gray-800">{currentRoom.title}</span>
                </div>
              </div>
            </div>

            {/* Room Details */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-4">Room Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <FaBed className="text-gold-500" />
                  <span className="text-gray-700">{currentRoom.roomSize}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-gold-500" />
                  <span className="text-gray-700">{currentRoom.capacity}</span>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-4">Current Availability</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className={`text-lg ${availability[roomType as keyof typeof availability] > 0 ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="text-gray-700">
                    {availability[roomType as keyof typeof availability]} of 12 flats available
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  availability[roomType as keyof typeof availability] > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {availability[roomType as keyof typeof availability] > 0 ? 'Available' : 'Fully Booked'}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {currentRoom.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <amenity.icon className="text-gold-500 text-lg" />
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Room Info */}
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <h1 className="text-3xl font-cinzel font-bold text-gray-800 mb-4">
                {currentRoom.title}
              </h1>
              <p className="text-gray-700 font-cinzel leading-relaxed mb-6">
                {currentRoom.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-cinzel font-semibold text-gray-800 mb-4">
                  What's Included:
                </h3>
                <ul className="space-y-2">
                  {currentRoom.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <FaCheckCircle className="text-gold-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-4">
                Pricing Details
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Room Rate (per night)</span>
                  <span className="text-xl font-semibold text-gray-800">{currentRoom.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">GST</span>
                  <span className="text-gray-600">{currentRoom.gst}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-cinzel font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-gold-600">{currentRoom.totalPrice}</span>
                </div>
                <p className="text-sm text-gray-500">*per night (including all taxes)</p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-6">
                Book Your Stay
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        min={formData.checkIn || new Date().toISOString().split('T')[0]}
                        required
                      />
                      <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                {/* Availability Display */}
                {formData.checkIn && formData.checkOut && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <FaCheckCircle className="text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Availability for {roomType?.toUpperCase()} Room
                      </span>
                    </div>
                    {availableFlats.length > 0 ? (
                      <div>
                        <p className="text-sm text-blue-700 mb-2">
                          Available flats: {availableFlats.length} out of 12
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {availableFlats.slice(0, 6).map(flat => (
                            <span key={flat} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {flat}
                            </span>
                          ))}
                          {availableFlats.length > 6 && (
                            <span className="text-blue-600 text-xs">
                              +{availableFlats.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaExclamationTriangle className="text-red-500" />
                        <p className="text-sm text-red-700">
                          No flats available for selected dates. Please choose different dates.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select 
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    placeholder="Any special requirements or requests..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold font-cinzel py-4 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg"
                >
                  Continue to Book
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
