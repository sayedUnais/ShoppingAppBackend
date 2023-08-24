const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Import Order model

// Simulate a successful payment and update order status to 'completed'
router.post('/process-payment', async (req, res) => {
  try {
    const { orderId } = req.body;

    // Simulate a successful payment
    // In a real-world scenario, you would integrate with a payment gateway here
    // For now, we'll just update the order status to 'completed'
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: 'completed' },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Payment processed successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
