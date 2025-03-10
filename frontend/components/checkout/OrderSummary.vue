<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
      <div class="space-y-3 mb-6">
        <div v-for="item in items" :key="item.id" class="flex justify-between">
          <span class="text-gray-600">{{ item.name }} x{{ item.quantity }}</span>
          <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
        </div>
        <div class="border-t border-gray-200 pt-3 mt-3">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Shipping</span>
            <span>${{ shipping.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Tax</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold mt-3 pt-3 border-t border-gray-200">
            <span>Total</span>
            <span>${{ total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
});

const subtotal = computed(() => {
  return props.items.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 10;
});

const tax = computed(() => {
  return subtotal.value * 0.08; // 8% tax
});

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value;
});
</script>
