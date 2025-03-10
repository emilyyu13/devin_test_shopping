# E-Commerce Order System

A full-stack e-commerce order system with Nuxt 3 frontend and Rails backend, featuring stock management, payment processing, and logistics tracking.

## Features

### Stock Management
- Real-time inventory tracking
- Low stock alerts (visual indicators for products with 5 or fewer items)
- Out of stock indicators and purchase prevention
- Stock level updates when items are added to cart

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

## Frontend (Nuxt 3)

The frontend is built with Nuxt 3 and includes:

- Product listing page with stock indicators
- Interactive shopping cart with localStorage persistence
- Checkout page with customer information and payment forms
- Order confirmation page with tracking information
- Order history page

## Backend (Mock API)

The backend is implemented as a mock API server using Express.js with the following endpoints:

- `/api/v1/products` - Get all products
- `/api/v1/orders` - Create and list orders
- `/api/v1/orders/:id` - Get order details
- `/api/v1/orders/:id/order_items` - Add items to an order
- `/api/v1/orders/:id/payments` - Process payments for an order

## Getting Started

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

### Running the Mock API Server

```bash
cd backend/mock-api
npm install
node server.js
```

## User Journey

1. Browse products on the home page
2. Add products to cart
3. Proceed to checkout
4. Enter shipping and payment information
5. Complete order
6. View order confirmation with tracking details
7. Check order history
