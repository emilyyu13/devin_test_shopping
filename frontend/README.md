# E-Commerce Order System Frontend

This is the frontend for the e-commerce order system built with Nuxt 3 and Tailwind CSS.

## Features

- Product browsing and filtering
- Shopping cart management
- Checkout process
- Order tracking and history
- Stock management
- Payment processing
- Logistics tracking

## Pages

- Home: Featured products and categories
- Products: Browse and filter products
- Product Detail: View product details and add to cart
- Cart: Manage cart items and proceed to checkout
- Checkout: Enter shipping and payment information
- Order Confirmation: View order details after purchase
- Orders: View order history and track shipments

## Components

- Product components: ProductCard, ProductDetail
- Cart components: CartItem, CartSummary
- Checkout components: ShippingForm, PaymentForm, OrderSummary
- Order components: OrderStatus, OrderTracking

## State Management

The application uses Pinia for state management with the following stores:

- Products: Manages product data and inventory
- Cart: Manages shopping cart items and calculations
- Orders: Manages order creation and history
- User: Manages user authentication and profile (to be implemented)

## API Integration

The frontend communicates with the Rails backend API through the API service layer.
