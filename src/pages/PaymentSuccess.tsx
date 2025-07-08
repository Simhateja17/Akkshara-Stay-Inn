import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaBed, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaHome,
  FaDownload
} from 'react-icons/fa';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Get order ID from URL params
  const urlParams = new URLSearchParams(location.search);
  const orderId = urlParams.get('order_id');

  useEffect(() => {
    // Verify payment status with backend
    const verifyPayment = async () => {
      if (orderId) {
        try {
          const response = await fetch(`http://localhost:5000/api/verify-payment/${orderId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Payment verified:', data);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      }
      setLoading(false);
    };

    verifyPayment();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-gold-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-cinzel">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-gold-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <FaCheckCircle className="w-12 h-12 text-green-500" />
          </div>
          
          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-800 font-cinzel mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 font-cinzel mb-2">
            Your payment was successful
          </p>
          <p className="text-gray-500">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Hotel Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 font-cinzel mb-6">
                Booking Details
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaBed className="text-gold-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Room Type</p>
                    <p className="text-gray-600">2-BHK Apartment</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-gold-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Check-in Date</p>
                    <p className="text-gray-600">July 8, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-gold-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Check-out Date</p>
                    <p className="text-gray-600">July 9, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaUser className="text-gold-500" />
                  <div>
                    <p className="font-semibold text-gray-800">Guests</p>
                    <p className="text-gray-600">2 Adults</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Payment Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 font-cinzel mb-6">
                Payment Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room Rate</span>
                  <span className="font-semibold">₹3,999</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (12%)</span>
                  <span className="font-semibold">₹480</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-800">Total Paid</span>
                  <span className="text-lg font-bold text-green-600">₹4,479</span>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">✓ Payment Verified</p>
                <p className="text-green-600 text-sm">Your booking is confirmed and secured</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-xl font-bold text-gray-800 font-cinzel mb-6">
            What's Next?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Confirmation Details</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Booking confirmation sent to your email</li>
                <li>• Check-in instructions will be shared 24 hours before arrival</li>
                <li>• Room will be ready by 2:00 PM on check-in date</li>
                <li>• Check-out time is 11:00 AM</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-gold-500" />
                  <span className="text-gray-600">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-gold-500" />
                  <span className="text-gray-600">info@akkshara-inn.com</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Available 24/7 for any assistance
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            <FaDownload />
            <span>Download Receipt</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold py-3 px-6 rounded-lg hover:scale-105 transition-all duration-300"
          >
            <FaHome />
            <span>Back to Home</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
