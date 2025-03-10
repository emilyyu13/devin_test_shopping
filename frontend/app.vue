<template>
  <div>
    <header class="bg-white shadow-md py-4 mb-8">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-blue-600">E-Commerce</NuxtLink>
        
        <nav class="flex items-center space-x-6">
          <NuxtLink to="/products" class="text-gray-700 hover:text-blue-600">Products</NuxtLink>
          <NuxtLink to="/orders" class="text-gray-700 hover:text-blue-600">Orders</NuxtLink>
          
          <NuxtLink to="/cart" class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700 hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span 
              v-if="itemCount > 0" 
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ itemCount }}
            </span>
          </NuxtLink>
        </nav>
      </div>
    </header>
    
    <NuxtPage />
    
    <footer class="bg-gray-800 text-white py-8 mt-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">About Us</h3>
            <p class="text-gray-400">We provide high-quality products with excellent customer service.</p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-400 hover:text-white">Home</NuxtLink></li>
              <li><NuxtLink to="/products" class="text-gray-400 hover:text-white">Products</NuxtLink></li>
              <li><NuxtLink to="/orders" class="text-gray-400 hover:text-white">Orders</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <p class="text-gray-400">Email: info@example.com</p>
            <p class="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCartStore } from '~/stores/cart';

const cartStore = useCartStore();

const itemCount = computed(() => cartStore.itemCount);

onMounted(() => {
  // Load cart from localStorage
  cartStore.loadCart();
});
</script>
