<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-4">
      <NuxtLink to="/orders" class="text-blue-600 hover:text-blue-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Orders
      </NuxtLink>
    </div>

    <div v-if="order" class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold mb-1">Order #{{ order.orderNumber }}</h1>
            <p class="text-gray-600">Placed on {{ order.date }}</p>
          </div>
          <div class="mt-4 md:mt-0">
            <span 
              class="inline-block px-3 py-1 rounded-full text-sm font-medium"
              :class="{
                'bg-green-100 text-green-800': order.status === 'Delivered',
                'bg-blue-100 text-blue-800': order.status === 'Shipped',
                'bg-yellow-100 text-yellow-800': order.status === 'Processing',
                'bg-purple-100 text-purple-800': order.status === 'Preparing'
              }"
            >
              {{ order.status }}
            </span>
          </div>
        </div>
        
        <!-- Order Items -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">Items</h2>
          <div class="border rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in order.items" :key="item.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md overflow-hidden">
                        <img :src="item.image" alt="Product image" class="h-full w-full object-cover">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ item.price.toFixed(2) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.quantity }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${{ (item.price * item.quantity).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Order Summary and Shipping Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Subtotal</span>
                  <span>${{ order.subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Shipping</span>
                  <span>${{ order.shipping.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Tax</span>
                  <span>${{ order.tax.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${{ order.total.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="mb-1">{{ order.shipping.name }}</p>
              <p class="mb-1">{{ order.shipping.address }}</p>
              <p class="mb-1">{{ order.shipping.city }}, {{ order.shipping.state }} {{ order.shipping.zipCode }}</p>
              <p class="mb-1">{{ order.shipping.email }}</p>
              <p>{{ order.shipping.phone }}</p>
            </div>
          </div>
        </div>
        
        <!-- Payment Information -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold mb-4">Payment Information</h2>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <span>{{ order.payment.method }}</span>
            </div>
            <p class="text-gray-600">{{ order.payment.cardNumber }}</p>
          </div>
        </div>
        
        <!-- Tracking Information -->
        <div v-if="order.status === 'Shipped' || order.status === 'Delivered'">
          <h2 class="text-xl font-semibold mb-4">Tracking Information</h2>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center mb-4">
              <span class="text-gray-600 mr-2">{{ order.trackingCompany }}:</span>
              <span class="font-medium">{{ order.trackingNumber }}</span>
              <a href="#" class="ml-2 text-blue-600 hover:text-blue-800 text-sm">Track Package</a>
            </div>
            
            <!-- Shipment Timeline -->
            <div class="relative pb-12">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="h-full w-0.5 bg-gray-200 pointer-events-none"></div>
              </div>
              
              <div class="relative flex items-start mb-6">
                <div class="flex items-center justify-center">
                  <span class="h-4 w-4 rounded-full bg-green-600 flex items-center justify-center ring-8 ring-white">
                    <svg class="h-2 w-2 text-white" viewBox="0 0 8 8" fill="currentColor">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </span>
                </div>
                <div class="ml-4">
                  <h3 class="font-medium">Order Placed</h3>
                  <p class="text-gray-500 text-sm">{{ order.timeline.orderPlaced }}</p>
                </div>
              </div>
              
              <div class="relative flex items-start mb-6">
                <div class="flex items-center justify-center">
                  <span class="h-4 w-4 rounded-full bg-green-600 flex items-center justify-center ring-8 ring-white">
                    <svg class="h-2 w-2 text-white" viewBox="0 0 8 8" fill="currentColor">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </span>
                </div>
                <div class="ml-4">
                  <h3 class="font-medium">Order Processed</h3>
                  <p class="text-gray-500 text-sm">{{ order.timeline.orderProcessed }}</p>
                </div>
              </div>
              
              <div class="relative flex items-start mb-6">
                <div class="flex items-center justify-center">
                  <span 
                    class="h-4 w-4 rounded-full flex items-center justify-center ring-8 ring-white"
                    :class="{'bg-green-600': order.status === 'Shipped' || order.status === 'Delivered', 'bg-gray-300': order.status !== 'Shipped' && order.status !== 'Delivered'}"
                  >
                    <svg v-if="order.status === 'Shipped' || order.status === 'Delivered'" class="h-2 w-2 text-white" viewBox="0 0 8 8" fill="currentColor">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </span>
                </div>
                <div class="ml-4">
                  <h3 class="font-medium">Order Shipped</h3>
                  <p v-if="order.status === 'Shipped' || order.status === 'Delivered'" class="text-gray-500 text-sm">{{ order.timeline.orderShipped }}</p>
                  <p v-else class="text-gray-500 text-sm">Pending</p>
                </div>
              </div>
              
              <div class="relative flex items-start">
                <div class="flex items-center justify-center">
                  <span 
                    class="h-4 w-4 rounded-full flex items-center justify-center ring-8 ring-white"
                    :class="{'bg-green-600': order.status === 'Delivered', 'bg-gray-300': order.status !== 'Delivered'}"
                  >
                    <svg v-if="order.status === 'Delivered'" class="h-2 w-2 text-white" viewBox="0 0 8 8" fill="currentColor">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                  </span>
                </div>
                <div class="ml-4">
                  <h3 class="font-medium">Order Delivered</h3>
                  <p v-if="order.status === 'Delivered'" class="text-gray-500 text-sm">{{ order.timeline.orderDelivered }}</p>
                  <p v-else class="text-gray-500 text-sm">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex flex-wrap gap-4 mt-8">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Contact Support
          </button>
          <button v-if="order.status !== 'Delivered' && order.status !== 'Shipped'" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Cancel Order
          </button>
          <button v-if="order.status === 'Delivered'" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300">
            Return Items
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const orderId = computed(() => Number(route.params.id));

// Mock order data
const ordersData = {
  1: {
    id: 1,
    orderNumber: 'ORD-12345',
    date: 'March 10, 2025',
    status: 'Delivered',
    items: [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 199.99,
        quantity: 1,
        image: 'https://placehold.co/300x200?text=Headphones'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 249.99,
        quantity: 2,
        image: 'https://placehold.co/300x200?text=SmartWatch'
      }
    ],
    subtotal: 699.97,
    shipping: 0,
    tax: 56.00,
    total: 755.97,
    shipping: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567'
    },
    payment: {
      method: 'Credit Card',
      cardNumber: '**** **** **** 1234'
    },
    trackingCompany: 'FedEx',
    trackingNumber: '1234567890',
    timeline: {
      orderPlaced: 'March 5, 2025, 10:30 AM',
      orderProcessed: 'March 6, 2025, 2:15 PM',
      orderShipped: 'March 7, 2025, 9:45 AM',
      orderDelivered: 'March 10, 2025, 11:20 AM'
    }
  },
  2: {
    id: 2,
    orderNumber: 'ORD-12346',
    date: 'March 5, 2025',
    status: 'Shipped',
    items: [
      {
        id: 8,
        name: 'Wireless Mouse',
        price: 24.99,
        quantity: 1,
        image: 'https://placehold.co/300x200?text=Mouse'
      }
    ],
    subtotal: 24.99,
    shipping: 5.99,
    tax: 2.00,
    total: 32.98,
    shipping: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567'
    },
    payment: {
      method: 'PayPal',
      cardNumber: 'john.doe@example.com'
    },
    trackingCompany: 'UPS',
    trackingNumber: '0987654321',
    timeline: {
      orderPlaced: 'March 5, 2025, 3:45 PM',
      orderProcessed: 'March 6, 2025, 10:30 AM',
      orderShipped: 'March 7, 2025, 2:15 PM'
    }
  },
  3: {
    id: 3,
    orderNumber: 'ORD-12347',
    date: 'March 1, 2025',
    status: 'Processing',
    items: [
      {
        id: 5,
        name: 'Coffee Maker',
        price: 89.99,
        quantity: 1,
        image: 'https://placehold.co/300x200?text=CoffeeMaker'
      }
    ],
    subtotal: 89.99,
    shipping: 0,
    tax: 7.20,
    total: 97.19,
    shipping: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567'
    },
    payment: {
      method: 'Credit Card',
      cardNumber: '**** **** **** 5678'
    },
    timeline: {
      orderPlaced: 'March 1, 2025, 5:30 PM',
      orderProcessed: 'March 2, 2025, 11:45 AM'
    }
  }
};

// Get order based on route parameter
const order = computed(() => ordersData[orderId.value] || null);
</script>
