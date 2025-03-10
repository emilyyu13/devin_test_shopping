<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="h-48 bg-gray-200 relative">
      <img :src="product.image" alt="Product image" class="w-full h-full object-cover">
      <div v-if="product.stock <= 5 && product.stock > 0" class="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">Low Stock</div>
      <div v-if="product.stock === 0" class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Out of Stock</div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-4">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="font-bold text-lg">${{ product.price.toFixed(2) }}</span>
        <button 
          @click="addToCart"
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition duration-300"
          :disabled="product.stock === 0"
          :class="{ 'opacity-50 cursor-not-allowed': product.stock === 0 }"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['add-to-cart']);

const addToCart = () => {
  emit('add-to-cart', props.product);
};
</script>
