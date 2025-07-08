import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { FaRegClock, FaBed, FaMapMarkerAlt, FaUtensils, FaCheck } from 'react-icons/fa';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHighlightSlide, setCurrentHighlightSlide] = useState(0);

  const heroImages = [
    '/images/carsousel 5.jpeg',
    '/images/carsousel 4.jpeg',
    '/images/carsousel 6.jpeg'
  ];

  const highlightImages = [
    [
      '/images/carsousel 1st.jpeg',
      '/images/carsousel 2nd.jpeg',
      '/images/carsousel 3rd.jpeg'
    ],
    [
      '/images/high.jpeg',
      '/images/high1.jpeg',
      '/images/high2.jpeg'
    ],
    [
      '/images/high3.jpeg',
      '/images/stand.jpeg',
      '/images/std.jpeg'
    ]
  ];

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextHighlightSlide = () => {
    setCurrentHighlightSlide((prev) => (prev + 1) % highlightImages.length);
  };

  const prevHighlightSlide = () => {
    setCurrentHighlightSlide((prev) => (prev - 1 + highlightImages.length) % highlightImages.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Soft dark + gold gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gold-100/30 to-black/40" />
            </div>
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-5xl md:text-7xl font-cinzel font-bold mb-4 drop-shadow-lg inline-block relative"
          >
            - AKKSHARA STAYINN
            <span className="block w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-4 rounded-full" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl font-cinzel text-gold-200 drop-shadow-lg"
          >
            Luxury, Spirituality & Signature Service
          </motion.p>
        </div>
        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-gold-400/80 text-white p-2 rounded-full transition-all duration-300 z-20"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-gold-400/80 text-white p-2 rounded-full transition-all duration-300 z-20"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </section>

      {/* About Homestay Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-800 mb-6 flex items-center">
                <span className="inline-block w-8 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mr-4" />
                About Our Homestay
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed font-cinzel bg-white/80 rounded-xl p-6 shadow-md">
                A homestay is an accommodation option where guests stay in a local's home, typically in a private room, and experience authentic daily life in the area. It often includes home-cooked meals, offering a taste of local cuisine, and allows travelers to immerse themselves in the culture by interacting with the host family.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/images/home1.jpeg"
                alt="Homestay"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl border-4 border-gold-100"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-800 mb-4 inline-block relative">
              Highlights
              <span className="block w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-2 rounded-full" />
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-cinzel">
              Luxury, spirituality and signature service have a new address with Akkshara Stay Inn. Design inspired by local heritage, meals to keep you satiated and top-notch facilities for a comfortable stay make us a luxurious starting point for your visits to the hills
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl bg-white/80">
              {highlightImages.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  className={`transition-opacity duration-1000 ${
                    slideIndex === currentHighlightSlide ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {slide.map((image, imageIndex) => (
                      <motion.div
                        key={imageIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: imageIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <img
                          src={image}
                          alt={`Highlight ${slideIndex + 1}-${imageIndex + 1}`}
                          className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-2xl border-4 border-gold-100 transition-all duration-300 group-hover:scale-105"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Highlight Carousel Controls */}
            <button
              onClick={prevHighlightSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-gold-400/80 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={nextHighlightSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-gold-400/80 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Hotel Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-800 mb-4 inline-block relative">
              Hotel Information
              <span className="block w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-2 rounded-full" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Check In/Out & Rooms */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gold-100 card-hover hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">CHECK IN – CHECK OUT</h3>
                  <p className="text-gray-600 flex items-center">
                    <FaRegClock className="text-gold-500 mr-2" />
                    24/7
                  </p>
                </div>
                <hr className="border-gold-100" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">ROOMS</h3>
                  <p className="text-gray-600 flex items-center">
                    <FaBed className="text-gold-500 mr-2" />
                    12 Rooms
                  </p>
                </div>
                <hr className="border-gold-100" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">Nearest Places To Visit</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Shilparamam(urban Art) - 1000mtrs</p>
                    <p>Sri Padmavati Temple - 2500mtrs</p>
                    <p>Padmavati Park - 1500mtrs</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Restaurants & Essentials */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gold-100 card-hover hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">Nearest Restaurants</h3>
                  <div className="text-gray-600 space-y-1">
                    <p><FaUtensils className="inline text-gold-500 mr-2" />Subbayya Gari Hotel - 270mtrs</p>
                    <p><FaUtensils className="inline text-gold-500 mr-2" />PS4 Restaurants - 1000mtrs</p>
                    <p><FaUtensils className="inline text-gold-500 mr-2" />Taj Hotel - 1500mtrs</p>
                    <p><FaUtensils className="inline text-gold-500 mr-2" />Fire And Feast - 1000mtrs</p>
                    <p><FaUtensils className="inline text-gold-500 mr-2" />The Peach Door - 1050mtrs</p>
                  </div>
                </div>
                <hr className="border-gold-100" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">HOTEL ESSENTIALS</h3>
                  <p className="text-gray-600">GSTIN : 37ACFFA3283Q1ZU</p>
                </div>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gold-100 card-hover hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">Contact</h3>
                  <div className="text-gray-600 space-y-3">
                    <p className="flex items-start">
                      <FaMapMarkerAlt className="text-gold-500 mr-2 mt-1" />
                      <span>Opp: Srinivasa kalyanamandapalu, P.S.Apartment, Padmavathipuram, Tiruchanur, Tirupathi - 517501</span>
                    </p>
                    <p className="flex items-center">
                      <FaRegClock className="text-gold-500 mr-2" />
                      contact@akksharastayinn.com
                    </p>
                    <p className="flex items-center">
                      <FaBed className="text-gold-500 mr-2" />
                      087735 72888
                    </p>
                    <p className="flex items-center">
                      <FaBed className="text-gold-500 mr-2" />
                      +91 9848000199
                    </p>
                    <p className="flex items-center">
                      <FaBed className="text-gold-500 mr-2" />
                      +91 9848000299
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-gradient-to-br from-cream-50 to-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-800 mb-4 inline-block relative">
              Facilities
              <span className="block w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-2 rounded-full" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl card-hover hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 font-cinzel flex items-center">
                <FaBed className="text-gold-500 mr-3" />
                HOTEL
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  In-door Parking Facility
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  Concierge
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  24-hour on-call doctor
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  Rooms and facilities designed for guests with limited mobility
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  Travel and car rental desk
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl card-hover hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 font-cinzel flex items-center">
                <FaUtensils className="text-gold-500 mr-3" />
                DINING
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  Subbayya Gari Hotel
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  PS4 Restaurant
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  Fire And Feast
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  The Peach Door
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-gold-500 mr-3" />
                  Taj Hotel
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location & Directions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Location & Directions</h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-cinzel">GETTING HERE</h3>
              <p className="text-lg text-gray-700 leading-relaxed font-cinzel">
                Opp: Srinivasa kalyanamandapalu, P.S.Apartment,<br />
                Padmavathipuram, Tiruchanur, Tirupathi, 517501, India
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.6398018298814!2d79.4340584!3d13.618797599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b005e4dab07%3A0xeb4f691cfed68194!2sAkkshara%20Stay%20Inn!5e0!3m2!1sen!2sin!4v1735033306331!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
                title="Akkshara Stay Inn Location Map"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 