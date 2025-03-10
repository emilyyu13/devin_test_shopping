<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Your Cart</h1>
    
    <div v-if="isEmpty" class="text-center py-12">
      <p class="text-xl text-gray-600 mb-6">Your cart is empty</p>
      <NuxtLink to="/products" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
        Browse Products
      </NuxtLink>
    </div>
    
    <div v-else class="flex flex-col md:flex-row gap-8">
      <div class="md:w-2/3">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Cart Items</h2>
          
          <div v-for="item in cartItems" :key="item.id" class="mb-4">
            <CartItem :item="item" />
          </div>
        </div>
      </div>
      
      <div class="md:w-1/3">
        <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            
            <div class="flex justify-between">
              <span>Tax (8%)</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>{{ shipping > 0 ? '$' + shipping.toFixed(2) : 'Free' }}</span>
            </div>
            
            <div class="border-t pt-3 mt-3">
              <div class="flex justify-between font-bold">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
          
          <NuxtLink 
            to="/checkout" 
            class="block w-full py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition duration-300"
          >
            Proceed to Checkout
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useCartStore } from '~/stores/cart';
import CartItem from '~/components/cart/CartItem.vue';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.cartItems);
const isEmpty = computed(() => cartStore.isEmpty);
const subtotal = computed(() => cartStore.subtotal);
const tax = computed(() => cartStore.tax);
const shipping = computed(() => cartStore.shipping);
const total = computed(() => cartStore.total);

onMounted(() => {
  // Load cart from localStorage
  cartStore.loadCart();
});
</script>
