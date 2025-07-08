import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaMobileAlt, FaGlobe, FaRegClock, FaCar, FaRegCommentDots, FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-gold-50 to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-cinzel font-bold text-gray-800 mb-8"
          >
            GET IN TOUCH
          </motion.h1>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="p-8 lg:p-12"
              >
                <h2 className="text-3xl font-cinzel font-bold text-gray-800 mb-8">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mr-4">
                      <FaMapMarkerAlt className="text-gold-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">
                        Address
                      </h3>
                      <p className="text-gray-700 leading-relaxed font-cinzel">
                        Opp: Srinivasa kalyanamandapalu, P.S.Apartment, Padmavathipuram,<br />
                        Tiruchanur, Tirupathi - 517501
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mr-4">
                      <MdEmail className="text-gold-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">
                        Email
                      </h3>
                      <a 
                        href="mailto:contact@akksharastayinn.com"
                        className="font-mono text-base text-gray-800 hover:underline transition-colors duration-300"
                      >
                        contact@akksharastayinn.com
                      </a>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mr-4">
                      <FaPhone className="text-gold-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">
                        Phone Numbers
                      </h3>
                      <div className="space-y-1">
                        <a 
                          href="tel:08773572888"
                          className="block text-gold-600 hover:text-gold-700 transition-colors duration-300 font-cinzel"
                        >
                          <FaPhone className="inline mr-2" /> 087735 72888
                        </a>
                        <a 
                          href="tel:+919848000199"
                          className="block text-gold-600 hover:text-gold-700 transition-colors duration-300 font-cinzel"
                        >
                          <FaMobileAlt className="inline mr-2" /> +91 9848000199
                        </a>
                        <a 
                          href="tel:+919848000299"
                          className="block text-gold-600 hover:text-gold-700 transition-colors duration-300 font-cinzel"
                        >
                          <FaMobileAlt className="inline mr-2" /> +91 9848000299
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mr-4">
                      <FaGlobe className="text-gold-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 font-cinzel">
                        Follow Us
                      </h3>
                      <div className="flex space-x-4">
                        <a 
                          href="#"
                          className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                          aria-label="Facebook"
                          onClick={e => { e.preventDefault(); alert('Facebook page coming soon!'); }}
                        >
                          <FaFacebook className="w-5 h-5" />
                        </a>
                        <a 
                          href="https://www.instagram.com/akkshara_homestay_tirupati/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                          aria-label="Instagram"
                        >
                          <FaInstagram className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact CTA */}
                <div className="mt-8">
                  <a
                    href="/contact"
                    className="btn-primary inline-block"
                  >
                    Book Your Stay Now
                  </a>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.6398018298814!2d79.4340584!3d13.618797599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b005e4dab07%3A0xeb4f691cfed68194!2sAkkshara%20Stay%20Inn!5e0!3m2!1sen!2sin!4v1735033306331!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-r-2xl"
                  title="Akkshara Stay Inn Location Map"
                />
              </motion.div>
            </div>
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
            <h2 className="section-title text-center">Visit Us Today</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-cinzel">
              Experience the perfect blend of comfort, convenience, and spirituality at Akkshara Stay Inn. 
              We're here to make your stay in Tirupati memorable and comfortable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-lg card-hover"
            >
              <FaRegClock className="text-gold-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-3">
                24/7 Availability
              </h3>
              <p className="text-gray-700 font-cinzel">
                We're available round the clock to assist you with check-ins, check-outs, and any other requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-lg card-hover"
            >
              <FaCar className="text-gold-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-3">
                Easy Access
              </h3>
              <p className="text-gray-700 font-cinzel">
                Conveniently located with easy access to major attractions, temples, and transportation hubs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-lg shadow-lg card-hover"
            >
              <FaRegCommentDots className="text-gold-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-cinzel font-semibold text-gray-800 mb-3">
                Quick Response
              </h3>
              <p className="text-gray-700 font-cinzel">
                Get quick responses to your inquiries and immediate assistance for any questions or concerns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 