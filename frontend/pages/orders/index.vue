<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Your Orders</h1>
    
    <div v-if="orders.length === 0" class="text-center py-12">
      <p class="text-xl text-gray-600 mb-6">You don't have any orders yet</p>
      <NuxtLink to="/products" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
        Browse Products
      </NuxtLink>
    </div>
    
    <div v-else class="space-y-6">
      <div v-for="order in orders" :key="order.id" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h2 class="text-xl font-semibold">Order #{{ order.id }}</h2>
            <p class="text-gray-600">{{ formatDate(order.created_at) }}</p>
          </div>
          
          <div class="flex items-center">
            <span 
              :class="{
                'bg-green-100 text-green-800': order.status === 'delivered',
                'bg-blue-100 text-blue-800': order.status === 'shipped',
                'bg-yellow-100 text-yellow-800': order.status === 'processing',
                'bg-gray-100 text-gray-800': order.status === 'pending'
              }"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ formatStatus(order.status) }}
            </span>
          </div>
        </div>
        
        <div class="border-t border-b py-4 mb-4">
          <div class="flex justify-between mb-2">
            <span class="font-semibold">Shipping Address:</span>
            <span>{{ order.address }}</span>
          </div>
          
          <div class="flex justify-between mb-2">
            <span class="font-semibold">Tracking Number:</span>
            <span>{{ order.tracking_number }}</span>
          </div>
          
          <div class="flex justify-between">
            <span class="font-semibold">Estimated Delivery:</span>
            <span>{{ formatDate(order.estimated_delivery) }}</span>
          </div>
        </div>
        
        <div class="flex justify-end">
          <NuxtLink :to="`/orders/${order.id}`" class="text-blue-600 hover:text-blue-800">
            View Order Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useOrderStore } from '~/stores/orders';

const orderStore = useOrderStore();
const orders = ref([]);

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatStatus = (status) => {
  const statuses = {
    'pending': 'Pending',
    'processing': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered'
  };
  
  return statuses[status] || status;
};

onMounted(() => {
  // In a real implementation, fetch orders from API
  // orderStore.fetchUserOrders('user@example.com').then(fetchedOrders => {
  //   orders.value = fetchedOrders;
  // });
  
  // For demo purposes, create mock orders
  orders.value = [
    {
      id: 1,
      created_at: new Date().toISOString(),
      address: '123 Main St, Anytown, USA',
      status: 'processing',
      tracking_number: 'TRK123456789',
      carrier: 'Express Shipping',
      estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      address: '123 Main St, Anytown, USA',
      status: 'delivered',
      tracking_number: 'TRK987654321',
      carrier: 'Express Shipping',
      estimated_delivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
});
</script>
