<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p class="text-gray-600 mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
        
        <div class="mb-6 text-left border border-gray-200 rounded-lg p-4">
          <div class="flex justify-between mb-2">
            <span class="font-medium">Order Number:</span>
            <span>{{ order.orderNumber }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">Order Date:</span>
            <span>{{ order.date }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-medium">Payment Method:</span>
            <span>{{ order.paymentMethod }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-medium">Shipping Method:</span>
            <span>{{ order.shippingMethod }}</span>
          </div>
        </div>
        
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4 text-left">Order Summary</h2>
          <div class="border-b border-gray-200 pb-4 mb-4">
            <div v-for="item in order.items" :key="item.id" class="flex justify-between mb-2">
              <span>{{ item.name }} x{{ item.quantity }}</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ order.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>${{ order.shipping.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tax</span>
              <span>${{ order.tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between font-bold pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${{ order.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4 text-left">Shipping Information</h2>
          <div class="text-left">
            <p>{{ order.shipping.name }}</p>
            <p>{{ order.shipping.address }}</p>
            <p>{{ order.shipping.city }}, {{ order.shipping.state }} {{ order.shipping.zipCode }}</p>
            <p>{{ order.shipping.email }}</p>
            <p>{{ order.shipping.phone }}</p>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <NuxtLink to="/orders" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            View My Orders
          </NuxtLink>
          <NuxtLink to="/" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-300">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mock order data
const order = {
  orderNumber: 'ORD-12345',
  date: 'March 10, 2025',
  paymentMethod: 'Credit Card (ending in 1234)',
  shippingMethod: 'Standard Shipping (3-5 business days)',
  items: [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      quantity: 1
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 249.99,
      quantity: 2
    },
    {
      id: 8,
      name: 'Wireless Mouse',
      price: 24.99,
      quantity: 1
    }
  ],
  subtotal: 724.96,
  shipping: 0,
  tax: 58.00,
  total: 782.96,
  shipping: {
    name: 'John Doe',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567'
  }
};
</script>
