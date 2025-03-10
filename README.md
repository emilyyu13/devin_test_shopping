# E-Commerce Order System

A full-stack e-commerce order system with Nuxt 3 frontend and Rails backend.

## Features

- **Stock Management**: Inventory tracking, stock updates, low stock alerts
- **Payment Processing**: Multiple payment methods, transaction history
- **Logistics**: Order tracking, shipping status updates, delivery management

## Tech Stack

### Frontend
- Nuxt 3
- Tailwind CSS
- Pinia for state management

### Backend
- Ruby on Rails API
- PostgreSQL database
- JWT authentication

## Project Structure

- `/frontend` - Nuxt 3 application
- `/backend` - Rails API application

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails server
```

## API Documentation

See the backend README for detailed API documentation.
