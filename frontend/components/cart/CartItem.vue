<template>
  <div class="flex items-center py-4 border-b">
    <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-md mr-4">
    
    <div class="flex-1">
      <h3 class="font-semibold">{{ item.name }}</h3>
      <p class="text-gray-600">${{ item.price.toFixed(2) }}</p>
    </div>
    
    <div class="flex items-center">
      <button 
        @click="decreaseQuantity" 
        class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
        :disabled="item.quantity <= 1"
        :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
      >
        <span class="text-lg">-</span>
      </button>
      
      <span class="mx-3 w-8 text-center">{{ item.quantity }}</span>
      
      <button 
        @click="increaseQuantity" 
        class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
        :disabled="!canIncrease"
        :class="{ 'opacity-50 cursor-not-allowed': !canIncrease }"
      >
        <span class="text-lg">+</span>
      </button>
    </div>
    
    <div class="ml-6 w-24 text-right">
      ${{ (item.price * item.quantity).toFixed(2) }}
    </div>
    
    <button @click="removeItem" class="ml-4 text-red-500 hover:text-red-700">
      Remove
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import { useProductStore } from '~/stores/products';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();
const productStore = useProductStore();

const product = computed(() => productStore.getProductById(props.item.id));
const canIncrease = computed(() => product.value && product.value.stock > 0);

const increaseQuantity = () => {
  if (canIncrease.value) {
    cartStore.updateQuantity(props.item.id, props.item.quantity + 1);
  }
};

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    cartStore.updateQuantity(props.item.id, props.item.quantity - 1);
  }
};

const removeItem = () => {
  cartStore.removeFromCart(props.item.id);
};
</script>
