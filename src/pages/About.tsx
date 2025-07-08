import React from 'react';
import { motion } from 'framer-motion';
import { FaBed } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-gold-50">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-gold-50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-cinzel font-bold text-gray-800 mb-8 tracking-wide drop-shadow-lg"
          >
            ABOUT US
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-cinzel">
              Welcome to Akkashara Stay Inn, your home away from home in the sacred city of Tirupati. Nestled in a serene and convenient location, our home stay is designed to provide comfort, privacy, and affordability for pilgrims, families, and travelers alike. At Akkashara Stay Inn, we believe in offering a personalized experience that blends modern amenities with a warm, homely atmosphere. Whether you are visiting for spiritual purposes, a family vacation, or business, our accommodations cater to all your needs:
            </p>

            <ul className="space-y-4 mb-8 text-gray-700 font-cinzel">
              <li className="flex items-start">
                <FaBed className="text-gold-500 mr-3 mt-1" />
                <div>
                  <span className="font-semibold">2BHK Apartments:</span> Spacious and perfect for families or groups, offering a complete home-like experience with all essential facilities.
                </div>
              </li>
              <li className="flex items-start">
                <FaBed className="text-gold-500 mr-3 mt-1" />
                <div>
                  <span className="font-semibold">1BHK Apartments:</span> Ideal for couples or small families seeking a cozy and private stay.
                </div>
              </li>
              <li className="flex items-start">
                <FaBed className="text-gold-500 mr-3 mt-1" />
                <div>
                  <span className="font-semibold">Standard Rooms:</span> Comfortable and budget-friendly for solo travelers or short stays.
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Co-Founders Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-24"
          >
            <h2 className="text-4xl font-cinzel font-bold text-gray-800 mb-16 text-center tracking-wide drop-shadow-lg">Co-Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center">
              {/* Co-Founder 1 */}
              <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 w-full max-w-xs border-t-4 border-gold-400">
                <div className="mb-6 w-48 h-48 overflow-hidden rounded-xl border-4 border-gold-400 shadow-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src="/images/co-founder.jpg"
                    alt="K. Chand Basha"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-gray-800 mt-2 text-center">K. Chand Basha</h3>
              </div>
              {/* Co-Founder 2 */}
              <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 w-full max-w-xs border-t-4 border-gold-400">
                <div className="mb-6 w-48 h-48 overflow-hidden rounded-xl border-4 border-gold-400 shadow-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src="/images/co-founder1.jpg"
                    alt="M. Amarnath Reddy"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-cinzel font-semibold text-gray-800 mt-2 text-center">M. Amarnath Reddy</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <p className="text-lg text-gray-700 leading-relaxed font-cinzel">
              Our mission is to ensure that every guest enjoys a relaxing and memorable stay. With clean and well-maintained accommodations, we strive to be your trusted choice in Tirupati. Discover the comfort of staying with us, where hospitality meets tranquility. We look forward to welcoming you at Akkashara Stay Inn and making your visit to Tirupati truly special.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 