// Import required packages and models
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import User model
const { body, validationResult } = require('express-validator');

// Registration route

router.post('/register',[

  // Validate username
  body('username').trim().isLength({ min: 5 }).withMessage('Username must be at least 5 characters'),

  // Validate password
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

], async (req, res) => {

  try {
    
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from request body
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Extract user data from request body
    const { username, password } = req.body;

    // Find the user by username and verify password
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
