const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }], // References to the Item model (order items)
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }, // Order status
  // Add other order-related fields as needed
});

// Create the Order model using the schema
const Order = mongoose.model('Order', orderSchema);

// Export the Order model
module.exports = Order;
