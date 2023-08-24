// Import required packages and models
const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem'); // Import CartItem model
// Additional imports if needed

// Get items in the user's cart
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.find({ userId }).populate('itemId');
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add an item to the user's cart
router.post('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { itemId, quantity } = req.body;
    const newCartItem = new CartItem({ userId, itemId, quantity });
    await newCartItem.save();
    res.status(201).json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an item in the user's cart
router.put('/:cartItemId', async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;
    const updatedCartItem = await CartItem.findByIdAndUpdate(
      cartItemId,
      { quantity },
      { new: true }
    );
    res.json({ message: 'Cart item updated', cartItem: updatedCartItem });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Remove an item from the user's cart
router.delete('/:cartItemId', async (req, res) => {
  try {
    const cartItemId = req.params.cartItemId;
    await CartItem.findByIdAndDelete(cartItemId);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
