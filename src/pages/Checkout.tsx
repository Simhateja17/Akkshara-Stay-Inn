import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBed,
  FaCalendarAlt
} from 'react-icons/fa';

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: string;
  specialRequests: string;
}

const Checkout: React.FC = () => {
  const { roomType } = useParams<{ roomType: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state as BookingData;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    countryCode: '+91'
  });

  const [otpData, setOtpData] = useState({
    generatedOtp: '',
    enteredOtp: '',
    isOtpSent: false,
    isOtpVerified: false,
    otpError: '',
    isOtpSending: false,
    successMessage: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS configuration from environment variables
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Debug environment variables
  React.useEffect(() => {
    console.log('Environment Variables Debug:');
    console.log('SERVICE_ID:', EMAILJS_SERVICE_ID);
    console.log('TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);
    console.log('PUBLIC_KEY:', EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing');
  }, [EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY]);

  // Initialize EmailJS
  React.useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY as string);
      console.log('EmailJS initialized successfully');
    } else {
      console.error('EmailJS public key not found in environment variables');
    }
  }, [EMAILJS_PUBLIC_KEY]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOTP = async () => {
    console.log('Send OTP clicked');
    console.log('Form email:', formData.email);
    
    if (!formData.email) {
      setOtpData(prev => ({ ...prev, otpError: 'Please enter email address first' }));
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setOtpData(prev => ({ ...prev, otpError: 'Please enter a valid email address' }));
      return;
    }

    // Normalize email to lowercase
    const normalizedEmail = formData.email.toLowerCase().trim();
    console.log('Normalized email:', normalizedEmail);

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS Configuration Missing:');
      console.error('SERVICE_ID:', EMAILJS_SERVICE_ID);
      console.error('TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);
      console.error('PUBLIC_KEY:', EMAILJS_PUBLIC_KEY ? 'Present' : 'Missing');
      
      setOtpData(prev => ({ 
        ...prev, 
        otpError: 'Email service not configured. Please contact support.' 
      }));
      return;
    }

    setOtpData(prev => ({ ...prev, isOtpSending: true, otpError: '' }));
    
    const otp = generateOTP();
    console.log('Generated OTP:', otp);
    
    try {
      // Template parameters that match EmailJS template variables
      const templateParams = {
        to_email: normalizedEmail,        // This must match {{to_email}} in template
        to_name: formData.fullName || 'Guest',
        otp_code: otp,
        hotel_name: 'Akkshara Stay Inn',
        user_email: normalizedEmail,      // Backup parameter name
        recipient_email: normalizedEmail  // Another backup parameter name
      };

      console.log('Template params:', templateParams);
      console.log('Sending email with:', {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID
      });

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS Response:', response);

      setOtpData(prev => ({
        ...prev,
        generatedOtp: otp,
        isOtpSent: true,
        isOtpSending: false,
        otpError: '',
        successMessage: `OTP sent successfully to ${normalizedEmail}!`
      }));

      console.log('OTP sent successfully');
      
    } catch (error: any) {
      console.error('Failed to send OTP - Full Error:', error);
      
      let errorMessage = 'Failed to send OTP. ';
      
      if (error.status === 422) {
        errorMessage += 'EmailJS template configuration issue. Please check if the template "To Email" field is set to {{to_email}}';
      } else if (error.text) {
        errorMessage += error.text;
      } else {
        errorMessage += 'Please try again or contact support.';
      }
      
      setOtpData(prev => ({
        ...prev,
        isOtpSending: false,
        otpError: errorMessage
      }));
    }
  };

  const verifyOTP = () => {
    if (otpData.enteredOtp === otpData.generatedOtp) {
      setOtpData(prev => ({
        ...prev,
        isOtpVerified: true,
        otpError: ''
      }));
      alert('OTP verified successfully!');
    } else {
      setOtpData(prev => ({
        ...prev,
        otpError: 'Invalid OTP. Please try again.'
      }));
    }
  };

  const roomData = {
    '2bhk': {
      title: '2-BHK Apartment',
      price: '₹ 3,999',
      gst: '₹ 480',
      totalPrice: '₹ 4,479',
      image: '/images/carsousel 1st.jpeg'
    },
    '1bhk': {
      title: '1-BHK Apartment',
      price: '₹ 2,999',
      gst: '₹ 360',
      totalPrice: '₹ 3,359',
      image: '/images/1bhk.jpeg'
    },
    'standard': {
      title: 'Standard Room',
      price: '₹ 1,999',
      gst: '₹ 240',
      totalPrice: '₹ 2,239',
      image: '/images/stand.jpeg'
    }
  };

  const currentRoom = roomData[roomType as keyof typeof roomData];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'enteredOtp') {
      setOtpData(prev => ({
        ...prev,
        enteredOtp: value,
        otpError: ''
      }));
    } else {
      // Convert email to lowercase for proper validation
      const processedValue = name === 'email' ? value.toLowerCase() : value;
      setFormData(prev => ({
        ...prev,
        [name]: processedValue
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpData.isOtpVerified) {
      alert('Please verify your email with OTP before proceeding.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Initialize Cashfree SDK
      const { load } = await import("@cashfreepayments/cashfree-js");
      const cashfreeInstance = await load({
        mode: "sandbox", // Use 'production' for live environment
      });

      // Create order via backend API
      const orderAmount = parseFloat(currentRoom.totalPrice.replace('₹ ', '').replace(',', ''));
      
      const response = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderAmount,
          currency: 'INR',
          roomType,
          bookingData,
          customerData: formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await response.json();
      console.log('Order created:', orderData);

      // Open Cashfree checkout
      cashfreeInstance.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: "_modal", // Opens checkout as a modal popup
      }).then((data: any) => {
        // Handle payment completion or errors
        console.log('Payment result:', data);
        console.log('Payment result keys:', Object.keys(data));
        console.log('Order data:', data.order);
        
        // Check multiple possible success indicators
        if (data.order) {
          console.log('Order status:', data.order.status);
          console.log('Order details:', data.order);
          
          // Redirect to success page regardless of status if order exists
          // We'll verify the actual payment status on the success page
          console.log('Payment completed, redirecting to success page...');
          navigate(`/payment/success?order_id=${orderData.order_id}`);
        } else if (data.error_code || data.status === 'FAILED') {
          // Only show error if there's an explicit error
          alert('Payment failed or was cancelled. Please try again.');
        } else {
          // For any other case, redirect to success page for verification
          console.log('Payment result unclear, redirecting to success page for verification...');
          navigate(`/payment/success?order_id=${orderData.order_id}`);
        }
      }).catch((error: any) => {
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
      });

    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Unable to process payment at the moment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onClick={() => navigate(-1)}
            className="flex items-center text-gold-600 hover:text-gold-700 transition-colors duration-300"
          >
            <FaArrowLeft className="mr-2" />
            <span className="font-cinzel font-medium">Modify your booking</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Form Header */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h2 className="text-xl font-cinzel font-bold text-gray-800">
                  Enter your details
                </h2>
              </div>
              <p className="text-gray-600 font-cinzel">
                We will use these details to share your booking information
              </p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Mobile Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter first and last name"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        required
                      />
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="px-3 py-3 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+86">+86</option>
                      </select>
                      <div className="relative flex-1">
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="e.g. 1234567890"
                          className="w-full px-4 py-3 pl-12 border border-gray-300 border-l-0 rounded-r-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                          required
                        />
                        <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@abc.com"
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent lowercase"
                      style={{ textTransform: 'lowercase' }}
                      required
                      disabled={otpData.isOtpVerified}
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    {otpData.isOtpVerified && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-green-500 text-sm font-medium">✓ Verified</span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={otpData.isOtpSending || otpData.isOtpVerified || !formData.email}
                    className="mt-3 px-4 py-2 bg-gold-500 hover:bg-gold-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300"
                  >
                    {otpData.isOtpSending ? 'Sending...' : otpData.isOtpVerified ? 'OTP Verified' : 'Send OTP'}
                  </button>
                  
                  {/* Success Message */}
                  {otpData.successMessage && (
                    <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg">
                      <p className="text-green-700 text-sm">{otpData.successMessage}</p>
                    </div>
                  )}
                  
                  {/* Error Message */}
                  {otpData.otpError && (
                    <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded-lg">
                      <p className="text-red-700 text-sm">{otpData.otpError}</p>
                    </div>
                  )}
                </div>

                {/* OTP Verification */}
                {otpData.isOtpSent && !otpData.isOtpVerified && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        name="enteredOtp"
                        value={otpData.enteredOtp}
                        onChange={handleInputChange}
                        placeholder="Enter 6-digit OTP"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        maxLength={6}
                        required
                      />
                      <button
                        type="button"
                        onClick={verifyOTP}
                        disabled={otpData.enteredOtp.length !== 6}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-300"
                      >
                        Verify
                      </button>
                    </div>
                    {otpData.otpError && (
                      <p className="text-red-500 text-sm mt-2">{otpData.otpError}</p>
                    )}
                    <p className="text-gray-600 text-sm mt-2">
                      OTP sent to {formData.email}. Please check your email.
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !otpData.isOtpVerified}
                  className="w-full bg-gradient-to-r from-gold-400 to-gold-600 text-white font-bold font-cinzel py-4 px-6 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting 
                    ? 'Processing...' 
                    : !otpData.isOtpVerified 
                      ? 'Verify Email First' 
                      : 'Confirm Booking'
                  }
                </button>
                {!otpData.isOtpVerified && (
                  <p className="text-gray-600 text-sm text-center mt-2">
                    Please verify your email with OTP to continue
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right Side - Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Hotel Info */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4">
                <img
                  src={currentRoom.image}
                  alt={currentRoom.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-cinzel font-bold text-gray-800">
                    Akkshara Stay Inn
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                      4.5 ★
                    </div>
                    <span className="text-gray-600 text-sm ml-2">(525 Ratings) • Excellent</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">1 Night</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FaCalendarAlt className="text-gray-400" />
                  <span className="font-cinzel text-gray-800">
                    {bookingData?.checkIn || 'Sun, 6 Jul'} – {bookingData?.checkOut || 'Mon, 7 Jul'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaBed className="text-gray-400" />
                  <span className="text-gray-800">1 Room, {bookingData?.guests || '1 Guest'}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <FaBed className="text-gray-400" />
                <span className="font-cinzel text-gray-800">{currentRoom.title}</span>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Room price for 1 Night X 1 Guest</span>
                  <span className="font-semibold">{currentRoom.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">GST (12%)</span>
                  <span className="text-gray-600">{currentRoom.gst}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-cinzel font-bold text-gray-800">Payable Amount</span>
                  <span className="text-2xl font-bold text-gray-800">{currentRoom.totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {bookingData?.specialRequests && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="font-cinzel font-semibold text-gray-800 mb-2">Special Requests</h4>
                <p className="text-gray-700">{bookingData.specialRequests}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
