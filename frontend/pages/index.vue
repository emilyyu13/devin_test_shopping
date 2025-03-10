<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Welcome to Our Shop</h1>
    
    <div class="flex justify-center mb-8">
      <NuxtLink to="/products" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
        Browse Products
      </NuxtLink>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Quality Products</h2>
        <p class="text-gray-700">Browse our extensive catalog of high-quality products with detailed descriptions and images.</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Secure Payments</h2>
        <p class="text-gray-700">Shop with confidence using our secure payment processing system with multiple payment options.</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-4">Fast Shipping</h2>
        <p class="text-gray-700">Track your orders in real-time with our comprehensive logistics tracking system.</p>
      </div>
    </div>
    
    <div class="bg-gray-100 p-8 rounded-lg mb-12">
      <h2 class="text-2xl font-bold mb-4 text-center">Featured Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div v-for="product in featuredProducts" :key="product.id" class="bg-white p-4 rounded-lg shadow-md">
          <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover rounded-md mb-4">
          <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
          <div class="flex justify-between items-center">
            <span class="text-gray-800 font-bold">${{ product.price.toFixed(2) }}</span>
            <NuxtLink to="/products" class="text-blue-600 hover:text-blue-800">View</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '~/stores/products';

const productStore = useProductStore();
const featuredProducts = ref([]);

onMounted(() => {
  // Get 4 random products from the store
  const availableProducts = productStore.availableProducts;
  featuredProducts.value = availableProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
});
</script>
