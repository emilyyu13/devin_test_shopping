<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Products</h1>
    
    <div v-if="productStore.loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading products...</p>
    </div>
    
    <div v-else-if="productStore.error" class="text-center py-12">
      <p class="text-red-500">{{ productStore.error }}</p>
      <button 
        @click="productStore.fetchProducts"
        class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium"
      >
        Try Again
      </button>
    </div>
    
    <div v-else>
      <!-- Stock status summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-2">Available Products</h2>
          <p class="text-3xl font-bold text-green-600">{{ productStore.availableProducts.length }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-2">Low Stock Products</h2>
          <p class="text-3xl font-bold text-yellow-600">{{ productStore.lowStockProducts.length }}</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-2">Out of Stock Products</h2>
          <p class="text-3xl font-bold text-red-600">{{ productStore.outOfStockProducts.length }}</p>
        </div>
      </div>
      
      <!-- Product grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="product in productStore.products" 
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div class="relative">
            <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
            <span v-if="product.stock === 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </span>
            <span v-else-if="product.stock <= 5" class="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
              Low Stock: {{ product.stock }} left
            </span>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold">${{ product.price.toFixed(2) }}</span>
              <button 
                @click="addToCart(product)" 
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-300"
                :disabled="product.stock === 0"
                :class="{ 'opacity-50 cursor-not-allowed': product.stock === 0 }"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '~/stores/products';
import { useCartStore } from '~/stores/cart';

const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(() => {
  productStore.fetchProducts();
});

const addToCart = (product) => {
  if (product.stock > 0) {
    const success = cartStore.addToCart(product, 1);
    if (success) {
      // Show success notification
      alert(`Added ${product.name} to cart`);
    } else {
      // Show error notification
      alert(cartStore.error);
    }
  }
};
</script>
