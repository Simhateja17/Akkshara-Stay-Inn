const express = require('express');
const cors = require('cors');
const { Cashfree } = require('cashfree-pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = process.env.CASHFREE_API_ENV === 'PRODUCTION' ? Cashfree.Environment.PRODUCTION : Cashfree.Environment.SANDBOX;

console.log('Cashfree Configuration:');
console.log('Client ID:', process.env.CASHFREE_APP_ID ? 'Present' : 'Missing');
console.log('Secret Key:', process.env.CASHFREE_SECRET_KEY ? 'Present' : 'Missing');
console.log('Environment:', process.env.CASHFREE_API_ENV);

// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency, roomType, bookingData, customerData } = req.body;

    const orderId = `order_${Date.now()}`;
    
    const orderRequest = {
      order_id: orderId,
      order_amount: amount,
      order_currency: currency,
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_name: customerData.fullName,
        customer_email: customerData.email,
        customer_phone: `${customerData.countryCode}${customerData.mobile}`,
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/success?order_id=${orderId}`,
        notify_url: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payment-webhook`,
      },
    };

    console.log('Creating order with:', orderRequest);

    const response = await Cashfree.PGCreateOrder("2023-08-01", orderRequest);
    
    if (response.data) {
      res.json({
        order_id: response.data.order_id,
        payment_session_id: response.data.payment_session_id,
        order_amount: response.data.order_amount,
        order_currency: response.data.order_currency
      });
    } else {
      throw new Error('Failed to create order');
    }
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message 
    });
  }
});

// Payment webhook endpoint
app.post('/api/payment-webhook', async (req, res) => {
  console.log('Payment webhook received:', req.body);
  
  try {
    const { orderId, orderAmount, paymentStatus, txStatus, txMsg } = req.body;
    
    if (paymentStatus === 'PAID' && txStatus === 'SUCCESS') {
      console.log(`✅ Payment successful for order: ${orderId} - Amount: ₹${orderAmount}`);
      
      // Here you can:
      // 1. Update your database with booking confirmation
      // 2. Send confirmation email to customer
      // 3. Send notification to hotel staff
      // 4. Generate booking receipt
      
      // For now, just log the successful payment
      console.log(`Booking confirmed for order: ${orderId}`);
    } else {
      console.log(`❌ Payment failed for order: ${orderId} - Status: ${paymentStatus}, Message: ${txMsg}`);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
  }
  
  res.status(200).json({ status: 'received' });
});

// Payment verification endpoint
app.get('/api/verify-payment/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Verify payment status with Cashfree
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    
    if (response.data && response.data.length > 0) {
      const payment = response.data[0];
      
      if (payment.payment_status === 'SUCCESS') {
        // Payment successful - send booking confirmation
        console.log(`Payment verified successfully for order: ${orderId}`);
        
        res.json({
          success: true,
          orderId: orderId,
          paymentStatus: payment.payment_status,
          amount: payment.payment_amount,
          paymentTime: payment.payment_time,
          message: 'Your booking has been confirmed!'
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Payment verification failed',
          status: payment.payment_status
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying payment'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${Cashfree.XEnvironment}`);
});
