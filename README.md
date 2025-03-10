# E-Commerce Order System

A full-stack e-commerce order system with Nuxt 3 frontend and Express.js mock backend.

## Features

### Stock Management
- Real-time inventory tracking with stock level updates
- Low stock alerts (visual indicators for products with 5 or fewer items)
- Out of stock indicators and purchase prevention
- Stock level reporting

### Payment Processing
- Multiple payment methods (Credit Card, PayPal)
- Secure payment form with validation
- Transaction history and payment status tracking
- Payment confirmation

### Logistics
- Order tracking with shipment status timeline
- Shipping status updates (Processing, Shipped, Out for Delivery, Delivered)
- Estimated delivery dates
- Tracking number and carrier information

## Project Structure

### Frontend (Nuxt 3)
- `frontend/`: Nuxt 3 application with Tailwind CSS
  - `pages/`: Application pages (home, products, cart, checkout, orders)
  - `components/`: Reusable Vue components
  - `stores/`: Pinia stores for state management
  - `assets/`: CSS and other static assets

### Backend (Express.js Mock API)
- `backend/mock-api/`: Express.js server with mock API endpoints
  - `server.js`: API implementation with in-memory data storage

## Getting Started

### Start the Backend
```bash
cd backend/mock-api
npm install
node server.js
```

### Start the Frontend
```bash
cd frontend
npm install
npm run dev
```

## User Journey

1. Browse products on the home/products page
2. Add items to cart with real-time stock updates
3. View and manage cart (add, remove, update quantities)
4. Proceed to checkout
5. Enter shipping and payment information
6. Receive order confirmation with tracking details
7. View order history and track order status
