import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaBed, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';
import {
  ROOM_PRICES,
  ROOM_TITLES,
  ALL_FLATS
} from '../../utils/roomManagement';

interface Room {
  id: string;
  type: string;
  title: string;
  price: number;
  gst: number;
  totalPrice: number;
  image: string;
  amenities: string[];
  description: string;
  isActive: boolean;
  maxGuests: number;
}

const AdminRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: '1',
      type: '2bhk',
      title: ROOM_TITLES['2bhk'],
      price: Math.round(ROOM_PRICES['2bhk'] / 1.12),
      gst: Math.round(ROOM_PRICES['2bhk'] - (ROOM_PRICES['2bhk'] / 1.12)),
      totalPrice: ROOM_PRICES['2bhk'],
      image: '/images/carsousel 1st.jpeg',
      amenities: ['WiFi', 'AC', 'TV', 'Kitchen', 'Parking'],
      description: 'Full 2-bedroom apartment access with both bedrooms, hall, and kitchen facilities. Blocks entire flat.',
      isActive: true,
      maxGuests: 6
    },
    {
      id: '2',
      type: '1bhk',
      title: ROOM_TITLES['1bhk'],
      price: Math.round(ROOM_PRICES['1bhk'] / 1.12),
      gst: Math.round(ROOM_PRICES['1bhk'] - (ROOM_PRICES['1bhk'] / 1.12)),
      totalPrice: ROOM_PRICES['1bhk'],
      image: '/images/1bhk.jpeg',
      amenities: ['WiFi', 'AC', 'TV', 'Kitchen'],
      description: 'Access to 1 bedroom, hall, and kitchen. One bedroom remains locked. Blocks entire flat.',
      isActive: true,
      maxGuests: 3
    },
    {
      id: '3',
      type: 'standard',
      title: ROOM_TITLES['standard'],
      price: Math.round(ROOM_PRICES['standard'] / 1.12),
      gst: Math.round(ROOM_PRICES['standard'] - (ROOM_PRICES['standard'] / 1.12)),
      totalPrice: ROOM_PRICES['standard'],
      image: '/images/std.jpeg',
      amenities: ['WiFi', 'AC', 'TV'],
      description: 'Single bedroom access only. No hall or kitchen access. Blocks entire flat.',
      isActive: true,
      maxGuests: 2
    }
  ]);

  const toggleRoomStatus = (roomId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, isActive: !room.isActive }
        : room
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          </div>
        </div>
      </div>

      {/* Hotel Structure Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Hotel Structure & Room Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Building Layout</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Total Flats: {ALL_FLATS.length} (3 floors × 4 flats per floor)</li>
                <li>• Floor 1: Flats 101, 102, 103, 104</li>
                <li>• Floor 2: Flats 201, 202, 203, 204</li>
                <li>• Floor 3: Flats 301, 302, 303, 304</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-blue-800 mb-2">Booking Logic</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Each flat is a 2BHK apartment</li>
                <li>• Any booking type blocks the entire flat</li>
                <li>• 2BHK = Full apartment access</li>
                <li>• 1BHK = 1 bedroom + hall (1 bedroom locked)</li>
                <li>• Standard = 1 bedroom only (no hall/kitchen)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Room Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Room Image */}
              <div className="relative h-48">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleRoomStatus(room.id)}
                    className={`p-2 rounded-full ${
                      room.isActive 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {room.isActive ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    room.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {room.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{room.title}</h3>
                  <span className="text-sm text-gray-500">ID: {room.id}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{room.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-semibold">₹{room.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (12%):</span>
                    <span className="font-semibold">₹{room.gst}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-900 font-bold">Total Price:</span>
                    <span className="text-blue-600 font-bold">₹{room.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Guests:</span>
                    <span className="font-semibold">{room.maxGuests}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities:</h4>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors">
                    <FaEye className="text-sm" />
                    <span className="text-sm">View</span>
                  </button>
                  <button 
                    onClick={() => console.log('Edit room:', room.id)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                  >
                    <FaEdit className="text-sm" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button 
                    onClick={() => console.log('Delete room:', room.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors"
                  >
                    <FaTrash className="text-sm" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <FaBed className="text-blue-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <FaToggleOn className="text-green-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Active Rooms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rooms.filter(room => room.isActive).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <FaToggleOff className="text-red-600 text-2xl mr-3" />
              <div>
                <p className="text-gray-600 text-sm">Inactive Rooms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rooms.filter(room => !room.isActive).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <div className="text-blue-600 text-2xl mr-3">₹</div>
              <div>
                <p className="text-gray-600 text-sm">Avg. Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{Math.round(rooms.reduce((sum, room) => sum + room.totalPrice, 0) / rooms.length)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;
