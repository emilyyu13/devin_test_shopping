# E-Commerce Order System Frontend

This is the frontend for the E-Commerce Order System, built with Nuxt 3 and Tailwind CSS.

## Features

- Product browsing and filtering
- Shopping cart management
- Checkout process
- Order tracking
- Stock management
- Payment processing

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

- `assets/`: CSS and other static assets
- `components/`: Reusable Vue components
- `pages/`: Application pages and routes
- `stores/`: Pinia stores for state management
- `public/`: Static files served at root path

## API Integration

The frontend communicates with the backend API for:

- Product data and stock levels
- Order creation and management
- Payment processing
- Shipping and logistics tracking

## State Management

The application uses Pinia for state management with the following stores:

- `products`: Product catalog and stock management
- `cart`: Shopping cart functionality
- `orders`: Order creation and tracking

## User Journey

1. Browse products on the home/products page
2. Add items to cart
3. View and manage cart
4. Proceed to checkout
5. Enter shipping and payment information
6. Receive order confirmation
7. Track order status
