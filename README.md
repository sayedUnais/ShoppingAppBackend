# Shopping Application Backend Documentation

Welcome to the documentation for the backend of our shopping application! This documentation provides a comprehensive overview of the backend architecture, API endpoints, installation instructions, and other essential information for understanding and interacting with our application.

## Table of Contents

- [Shopping Application Backend Documentation](#shopping-application-backend-documentation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [API Documentation](#api-documentation)
    - [Authentication](#authentication)
    - [User Management](#user-management)
    - [Inventory Management](#inventory-management)
    - [Cart Management](#cart-management)
    - [Order Management](#order-management)
    - [Payments](#payments)
  - [NGINX Load Balancing](#nginx-load-balancing)
  - [Testing](#testing)
    - [Example: Registering a New User](#example-registering-a-new-user)
  - [Scalability Strategy: AWS Load Balancing](#scalability-strategy-aws-load-balancing)
    - [Cloud-Powered Load Balancing](#cloud-powered-load-balancing)
    - [Dynamic Scaling with Auto Scaling](#dynamic-scaling-with-auto-scaling)
    - [NGINX's Role](#nginxs-role)
  - [Conclusion: Our Approach](#conclusion-our-approach)


## Introduction

Our shopping application's backend serves as the foundation for handling user interactions, managing inventory, processing orders, and more. This documentation provides insights into the architecture, API endpoints, and how to get started with the project.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- NGINX (for load balancing)
- Postman (for testing)

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- NGINX (if using load balancing)

### Installation

1. Clone the repository:
  git clone <repository-url>
  cd ShoppingApp

2. Install dependencies:
   npm install

3. Set up your MongoDB database and configure the connection string in the `index.js` file.

4. Start the application instances:
    node index.js


## API Documentation

### Authentication

- POST `/auth/register`: Register a new user.
- POST `/auth/login`: Authenticate a user.

### User Management

- GET `/users/:userId`: Retrieve user information.

### Inventory Management

- GET `/inventory`: Retrieve all items in the inventory.
- POST `/inventory`: Add a new item to the inventory.
- PUT `/inventory/:itemId`: Update an item in the inventory.
- DELETE `/inventory/:itemId`: Delete an item from the inventory.

### Cart Management

- GET `/cart/:userId`: Retrieve items in the user's cart.
- POST `/cart/:userId`: Add an item to the user's cart.
- PUT `/cart/:cartItemId`: Update an item in the user's cart.
- DELETE `/cart/:cartItemId`: Remove an item from the user's cart.

### Order Management

- GET `/orders`: Retrieve all orders.
- POST `/orders`: Place a new order.
- PUT `/orders/:orderId`: Update the status of an order.
- PUT `/orders/:orderId/refund`: Refund an order.

### Payments

- POST `/payments/process-payment`: Simulate a successful payment and update order status.

## NGINX Load Balancing

Our application implements load balancing using NGINX to distribute incoming traffic across multiple instances of the application for improved performance and availability.

For detailed NGINX configuration, refer to the `nginx.conf` file.

## Testing

We recommend using Postman to test the API endpoints. Import the provided Postman collection to get started with testing different scenarios.

### Example: Registering a New User

1. Select the `POST` request in your Postman collection for user registration.
2. Set the request URL to your backend endpoint: `http://localhost:3000/auth/register`.
3. In the request body, provide a new username and password:
   ```json
   {
     "username": "newuser",
     "password": "password123"
   }

Testing Other Endpoints
    Repeat a similar process for other endpoints in your collection. Customize the request bodies and observe the responses to ensure that the backend functions as expected.

    Adjust the request URLs based on the instance you're testing (e.g., http://localhost:3000 or http://localhost:3001).


## Scalability Strategy: AWS Load Balancing

To address the challenge of handling thousands of daily requests, with a peak of 100,000 users in a day, we're adopting a robust approach. While NGINX demonstrates load balancing, our true strategy leverages Amazon Web Services (AWS) for scalability.

### Cloud-Powered Load Balancing

NGINX demonstrates load balancing; however, it's not tailored to the full challenge. AWS's Elastic Load Balancing (ELB) will be the cornerstone, efficiently distributing traffic across multiple instances.

### Dynamic Scaling with Auto Scaling

AWS's Auto Scaling adapts resources to real-time traffic, automatically adding or removing instances. This ensures our application can handle the peak of 100,000 users seamlessly.

### NGINX's Role

Our use of NGINX for load balancing serves as a concept illustration, showing how distribution works. For scalability, we're focusing on:

- **Elastic Load Balancing** for efficient traffic distribution.
- **Auto Scaling** for dynamic resource adjustments.
- **Amazon RDS** for data reliability.

## Conclusion: Our Approach

While NGINX showcases basic load balancing, AWS's ELB and Auto Scaling are key to our strategy. By deploying on AWS, we're confident in our ability to exceed the challenge. Our approach showcases scalability and performance in handling the expected traffic surge.


