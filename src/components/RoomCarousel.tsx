import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaMoneyBillWave, FaUsers, FaArrowRight } from 'react-icons/fa';

interface Room {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
  capacity: string;
  features: string[];
}

const RoomCarousel: React.FC = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState(0);

  const rooms: Room[] = [
    {
      id: '2bhk',
      title: '2-BHK Apartment',
      price: '₹ 3999+12%GST',
      description: 'Spacious and perfect for families or groups, offering a complete home-like experience with all essential facilities.',
      image: '/images/carsousel 1st.jpeg',
      capacity: '4-6 Guests',
      features: ['Fully furnished', 'Kitchen facilities', 'Living room', '2 Bedrooms']
    },
    {
      id: '1bhk',
      title: '1-BHK Apartment',
      price: '₹ 2999+12%GST',
      description: 'Ideal for couples or small families seeking a cozy and private stay.',
      image: '/images/1bhk.jpeg',
      capacity: '2-4 Guests',
      features: ['Cozy living space', 'Kitchen facilities', '1 Bedroom', 'Private balcony']
    },
    {
      id: 'standard',
      title: 'Standard Room',
      price: '₹ 1999+12%GST',
      description: 'Comfortable and budget-friendly for solo travelers or short stays.',
      image: '/images/stand.jpeg',
      capacity: '1-2 Guests',
      features: ['Comfortable bed', 'Private bathroom', 'Clean amenities', '24/7 support']
    }
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoom((prev) => (prev + 1) % rooms.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [rooms.length]);

  const handleRoomClick = (roomId: string) => {
    navigate(`/booking/${roomId}`);
  };

  const handleDotClick = (index: number) => {
    setCurrentRoom(index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cream-50 to-gold-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-800 mb-4 inline-block relative">
            Our Rooms
            <span className="block w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-2 rounded-full" />
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed font-cinzel">
            Choose from our carefully designed rooms to make your stay comfortable and memorable
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Display */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <motion.div
              key={currentRoom}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={rooms[currentRoom].image}
                    alt={rooms[currentRoom].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-xl mx-8 md:mx-16 text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h3 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 drop-shadow-lg">
                        {rooms[currentRoom].title}
                      </h3>
                      <div className="flex items-center mb-4 space-x-6">
                        <p className="text-2xl md:text-3xl font-semibold text-gold-300 flex items-center">
                          <FaMoneyBillWave className="mr-2" />
                          {rooms[currentRoom].price}
                        </p>
                        <p className="text-lg text-gold-200 flex items-center">
                          <FaUsers className="mr-2" />
                          {rooms[currentRoom].capacity}
                        </p>
                      </div>
                      <p className="text-lg md:text-xl mb-6 leading-relaxed font-cinzel text-gray-100 drop-shadow">
                        {rooms[currentRoom].description}
                      </p>
                      
                      {/* Features */}
                      <div className="mb-8">
                        <div className="grid grid-cols-2 gap-2">
                          {rooms[currentRoom].features.map((feature, index) => (
                            <div key={index} className="flex items-center text-gold-200">
                              <div className="w-2 h-2 bg-gold-400 rounded-full mr-2" />
                              <span className="text-sm md:text-base">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Book Now Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRoomClick(rooms[currentRoom].id)}
                        className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center group"
                      >
                        Book Now
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentRoom
                    ? 'bg-gold-500 shadow-lg scale-125'
                    : 'bg-gray-300 hover:bg-gold-300'
                }`}
              />
            ))}
          </div>

          {/* Room Thumbnails */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => handleRoomClick(room.id)}
                  className={`relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group transition-all duration-300 ${
                    index === currentRoom
                      ? 'ring-4 ring-gold-400 shadow-2xl scale-105'
                      : 'hover:shadow-xl hover:scale-105'
                  }`}
                >
                  <div className="relative h-48">
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold font-cinzel">{room.title}</h4>
                      <p className="text-gold-300 font-semibold">{room.price}</p>
                    </div>
                    {index === currentRoom && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-600">
                        <FaBed className="mr-2 text-gold-500" />
                        <span className="text-sm">{room.capacity}</span>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-gold-500 group-hover:text-gold-600"
                      >
                        <FaArrowRight />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomCarousel;
