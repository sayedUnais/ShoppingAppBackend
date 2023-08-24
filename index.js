const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Item = require('./models/Item');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const errorHandler = require('./errorHandler');
const rateLimit = require('express-rate-limit');

const appInstance1 = express();
const appInstance2 = express();

const PORT1 = process.env.PORT || 3000; // Port number for the first instance
const PORT2 = process.env.PORT || 3001; // Port number for the second instance

// Connect to MongoDB database
mongoose.connect('mongodb+srv://unais:786@cluster0.p3zkvoj.mongodb.net/ShoppingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Configure middleware to handle JSON and URL-encoded data
appInstance1.use(express.json());
appInstance1.use(express.urlencoded({ extended: true }));

appInstance2.use(express.json());
appInstance2.use(express.urlencoded({ extended: true }));

// Define a route handler for the root URL for both instances
appInstance1.get('/', (req, res) => {
  res.send('Welcome to the shopping application on Instance 1!'); // Modify this response as needed
});

appInstance2.get('/', (req, res) => {
  res.send('Welcome to the shopping application on Instance 2!'); // Modify this response as needed
});

// Apply rate limiting middleware for both instances
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

appInstance1.use(limiter);
appInstance2.use(limiter);

// Configure Routes for both instances
appInstance1.use('/auth', require('./routes/auth')); // Auth routes
appInstance1.use('/inventory', require('./routes/inventory')); // Inventory routes
appInstance1.use('/cart', require('./routes/cart')); // Cart routes
appInstance1.use('/payments', require('./routes/payments')); // Payments routes
appInstance1.use('/orders', require('./routes/orders')); // Orders routes

appInstance2.use('/auth', require('./routes/auth')); // Auth routes
appInstance2.use('/inventory', require('./routes/inventory')); // Inventory routes
appInstance2.use('/cart', require('./routes/cart')); // Cart routes
appInstance2.use('/payments', require('./routes/payments')); // Payments routes
appInstance2.use('/orders', require('./routes/orders')); // Orders routes

// Use the error handling middleware for both instances
appInstance1.use(errorHandler);
appInstance2.use(errorHandler);

// Start the Express servers for both instances
appInstance1.listen(PORT1, () => {
  console.log(`Instance 1 is running on port ${PORT1}`);
});

appInstance2.listen(PORT2, () => {
  console.log(`Instance 2 is running on port ${PORT2}`);
});
