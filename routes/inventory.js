// Import required packages and models
const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // Import Item model

// Get all items in inventory
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new item to inventory
router.post('/', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newItem = new Item({ name, price, description });
    await newItem.save();
    res.status(201).json({ message: 'Item added to inventory' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update an item in inventory
router.put('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, price, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, price, description },
      { new: true }
    );
    res.json({ message: 'Item updated', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an item from inventory
router.delete('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    await Item.findByIdAndDelete(itemId);
    res.json({ message: 'Item deleted from inventory' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
