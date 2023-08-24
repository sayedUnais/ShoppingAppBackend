const mongoose = require('mongoose');

// Define the schema for the CartItem model
const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, // Reference to the Item model
  quantity: { type: Number, default: 1 }, // Quantity of the item in the cart
  // Add other cart item-related fields as needed
});

// Create the CartItem model using the schema
const CartItem = mongoose.model('CartItem', cartItemSchema);

// Export the CartItem model
module.exports = CartItem;
