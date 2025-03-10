<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <div class="text-center mb-6">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-800">Order Confirmed!</h1>
          <p class="text-gray-600 mt-2">Thank you for your purchase</p>
        </div>
        
        <div class="border-t border-b py-4 mb-6">
          <div class="flex justify-between mb-2">
            <span class="font-semibold">Order Number:</span>
            <span>{{ order?.id || '#12345' }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-semibold">Order Date:</span>
            <span>{{ formatDate(order?.created_at) }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="font-semibold">Shipping Address:</span>
            <span>{{ order?.address || '123 Main St, Anytown, USA' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Payment Method:</span>
            <span>{{ formatPaymentMethod(order?.payment?.payment_method) }}</span>
          </div>
        </div>
        
        <div class="mb-6">
          <h2 class="text-xl font-semibold mb-4">Order Status</h2>
          
          <div class="relative">
            <div class="flex items-center justify-between mb-2">
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sm mt-1">Confirmed</span>
              </div>
              
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sm mt-1">Processing</span>
              </div>
              
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span class="text-white">3</span>
                </div>
                <span class="text-sm mt-1">Shipped</span>
              </div>
              
              <div class="flex flex-col items-center">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span class="text-white">4</span>
                </div>
                <span class="text-sm mt-1">Delivered</span>
              </div>
            </div>
            
            <div class="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
              <div class="h-full bg-blue-600" style="width: 33%;"></div>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-blue-50 rounded-md">
            <p class="text-blue-800">
              <span class="font-semibold">Estimated Delivery:</span> 
              {{ formatDate(order?.estimated_delivery) }}
            </p>
            <p class="text-blue-800 mt-1">
              <span class="font-semibold">Tracking Number:</span> 
              {{ order?.tracking_number || 'TRK123456789' }}
            </p>
            <p class="text-blue-800 mt-1">
              <span class="font-semibold">Carrier:</span> 
              {{ order?.carrier || 'Express Shipping' }}
            </p>
          </div>
        </div>
        
        <div class="flex justify-between">
          <NuxtLink to="/products" class="text-blue-600 hover:text-blue-800">
            Continue Shopping
          </NuxtLink>
          
          <NuxtLink to="/orders" class="text-blue-600 hover:text-blue-800">
            View All Orders
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore } from '~/stores/orders';

const route = useRoute();
const orderStore = useOrderStore();
const order = ref(null);

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatPaymentMethod = (method) => {
  if (!method) return 'Credit Card';
  
  const methods = {
    'credit_card': 'Credit Card',
    'paypal': 'PayPal'
  };
  
  return methods[method] || method;
};

onMounted(async () => {
  const orderId = route.query.id;
  
  if (orderId) {
    // In a real implementation, fetch order from API
    // const fetchedOrder = await orderStore.fetchOrder(orderId);
    // order.value = fetchedOrder;
    
    // For demo purposes, create a mock order
    order.value = {
      id: orderId,
      created_at: new Date().toISOString(),
      address: '123 Main St, Anytown, USA',
      status: 'processing',
      tracking_number: 'TRK123456789',
      carrier: 'Express Shipping',
      estimated_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      payment: {
        payment_method: 'credit_card'
      }
    };
  }
});
</script>
