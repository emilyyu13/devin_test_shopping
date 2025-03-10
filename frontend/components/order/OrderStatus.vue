<template>
  <span 
    class="inline-block px-3 py-1 rounded-full text-sm font-medium"
    :class="{
      'bg-green-100 text-green-800': status === 'Delivered',
      'bg-blue-100 text-blue-800': status === 'Shipped',
      'bg-yellow-100 text-yellow-800': status === 'Processing',
      'bg-purple-100 text-purple-800': status === 'Preparing'
    }"
  >
    {{ status }}
  </span>
</template>

<script setup>
defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['Delivered', 'Shipped', 'Processing', 'Preparing'].includes(value)
  }
});
</script>
