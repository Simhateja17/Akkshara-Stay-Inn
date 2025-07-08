// Mock API endpoint for creating Cashfree orders
// In a real application, this would be a proper backend endpoint

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { amount, currency, roomType, bookingData, customerData } = req.body;

    // Generate a mock payment session ID
    // In real implementation, you would use Cashfree SDK to create an actual order
    const orderId = `order_${Date.now()}`;
    const paymentSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Mock successful response
    const orderData = {
      order_id: orderId,
      payment_session_id: paymentSessionId,
      order_amount: amount,
      order_currency: currency,
      customer_details: {
        customer_id: `cust_${Date.now()}`,
        customer_name: customerData.fullName,
        customer_email: customerData.email,
        customer_phone: `${customerData.countryCode}${customerData.mobile}`,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/status?order_id=${orderId}`,
      },
    };

    console.log('Mock order created:', orderData);

    res.status(200).json(orderData);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}
