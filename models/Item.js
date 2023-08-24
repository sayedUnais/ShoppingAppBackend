const mongoose = require('mongoose');

// Define the schema for the Item model
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the item
  price: { type: Number, required: true }, // Price of the item
  description: String, // Description of the item
  // Add other item-related fields as needed
});

// Create the Item model using the schema
const Item = mongoose.model('Item', itemSchema);

// Export the Item model
module.exports = Item;
