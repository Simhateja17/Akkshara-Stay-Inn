import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBed, FaMoneyBillWave, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const Rooms: React.FC = () => {
  const services = [
    {
      id: '2bhk',
      title: '2-BHK',
      price: '₹ 3999+12%GST',
      description: 'Spacious and perfect for families or groups, offering a complete home-like experience with all essential facilities.',
      image: '/images/carsousel 1st.jpeg',
      features: ['Fully furnished', 'Kitchen facilities', 'Living room', '2 Bedrooms', 'Modern amenities']
    },
    {
      id: '1bhk',
      title: '1-BHK',
      price: '₹ 2999+12%GST',
      description: 'Ideal for couples or small families seeking a cozy and private stay.',
      image: '/images/1bhk.jpeg',
      features: ['Cozy living space', 'Kitchen facilities', '1 Bedroom', 'Private balcony', 'Essential amenities']
    },
    {
      id: 'standard',
      title: 'Standard Room',
      price: '₹ 1999+12%GST',
      description: 'Comfortable and budget-friendly for solo travelers or short stays.',
      image: '/images/stand.jpeg',
      features: ['Comfortable bed', 'Private bathroom', 'Clean amenities', '24/7 support', 'Budget friendly']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-gold-50">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-gold-50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-cinzel font-bold text-gray-800 mb-8"
          >
            ROOMS WE PROVIDE
          </motion.h1>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-xl overflow-hidden card-hover flex flex-col md:flex-row group`}
              >
                {/* Image with overlay */}
                <div className="md:w-1/2 relative min-h-[280px]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-72 md:h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <FaBed className="text-white text-2xl drop-shadow-lg" />
                    <span className="text-white text-xl font-bold font-cinzel drop-shadow-lg">{service.title}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <h2 className="text-3xl font-cinzel font-bold text-gray-800 mb-2 flex items-center">
                      <span className="inline-block w-2 h-8 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full mr-4" />
                      {service.title}
                    </h2>
                    <p className="text-2xl font-semibold text-gold-600 mb-4 flex items-center">
                      <FaMoneyBillWave className="mr-2 text-gold-500" />
                      {service.price}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6 font-cinzel text-lg">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 font-cinzel">
                      What's Included:
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-700 text-base">
                          <FaCheckCircle className="text-gold-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Link
                      to={`/booking/${service.id}`}
                      className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg tracking-wide"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title text-center">Why Choose Akkshara Stay Inn?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <FaBed className="text-gold-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-3">
                Home-like Comfort
              </h3>
              <p className="text-gray-700 font-cinzel">
                Experience the warmth and comfort of a home away from home with our personalized service and cozy accommodations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <FaMapMarkerAlt className="text-gold-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-3">
                Prime Location
              </h3>
              <p className="text-gray-700 font-cinzel">
                Conveniently located near major attractions and temples, making your spiritual journey and sightseeing effortless.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <FaMoneyBillWave className="text-gold-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-3">
                Affordable Luxury
              </h3>
              <p className="text-gray-700 font-cinzel">
                Enjoy premium accommodations and amenities at competitive prices, ensuring value for your money.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms; 