<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover">
    
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
      <p class="text-gray-700 mb-4 h-12 overflow-hidden">{{ product.description }}</p>
      
      <div class="flex justify-between items-center mb-4">
        <span class="text-xl font-bold">${{ product.price.toFixed(2) }}</span>
        
        <div class="flex items-center">
          <span 
            :class="{
              'text-green-600': product.stock > 5,
              'text-yellow-600': product.stock > 0 && product.stock <= 5,
              'text-red-600': product.stock === 0
            }"
            class="text-sm mr-2"
          >
            {{ stockStatus }}
          </span>
          <div 
            :class="{
              'bg-green-500': product.stock > 5,
              'bg-yellow-500': product.stock > 0 && product.stock <= 5,
              'bg-red-500': product.stock === 0
            }"
            class="w-3 h-3 rounded-full"
          ></div>
        </div>
      </div>
      
      <button 
        @click="addToCart" 
        class="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        :disabled="product.stock === 0"
        :class="{ 'opacity-50 cursor-not-allowed': product.stock === 0 }"
      >
        {{ product.stock === 0 ? 'Out of Stock' : 'Add to Cart' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();

const stockStatus = computed(() => {
  if (props.product.stock === 0) return 'Out of Stock';
  if (props.product.stock <= 5) return `Low Stock: ${props.product.stock}`;
  return `In Stock: ${props.product.stock}`;
});

const addToCart = () => {
  if (props.product.stock > 0) {
    const success = cartStore.addToCart(props.product, 1);
    if (success) {
      // Show success notification or feedback
    }
  }
};
</script>
