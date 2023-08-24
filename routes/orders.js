const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new order
router.post('/', async (req, res) => {
  try {
    const { userId, items } = req.body;
    const newOrder = new Order({ userId, items });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update the status of an order
router.put('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Refund an order
router.put('/:orderId/refund', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status !== 'completed') return res.status(400).json({ message: 'Order is not eligible for refund' });
    
    // Perform the refund logic here
    // For example, you could update the order status to 'refunded'
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: 'refunded' }, { new: true });

    res.json({ message: 'Order refunded', order: updatedOrder });
  } catch (error) {
    console.error('Error refunding order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
