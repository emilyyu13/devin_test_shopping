<template>
  <div class="flex flex-col md:flex-row border-b border-gray-200 py-4 last:border-b-0 last:pb-0">
    <div class="md:w-24 h-24 bg-gray-200 rounded-md overflow-hidden mb-4 md:mb-0">
      <img :src="item.image" alt="Product image" class="w-full h-full object-cover">
    </div>
    <div class="md:ml-4 flex-1">
      <div class="flex flex-col md:flex-row md:justify-between">
        <div>
          <h3 class="font-semibold text-lg mb-1">{{ item.name }}</h3>
          <p class="text-gray-600 text-sm mb-2">{{ item.description }}</p>
          <div class="flex items-center mb-4 md:mb-0">
            <div class="flex items-center border border-gray-300 rounded">
              <button 
                @click="decreaseQuantity" 
                class="px-3 py-1 border-r border-gray-300 hover:bg-gray-100"
              >
                -
              </button>
              <span class="px-4 py-1">{{ item.quantity }}</span>
              <button 
                @click="increaseQuantity" 
                class="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
                :disabled="item.quantity >= item.stock"
                :class="{ 'opacity-50 cursor-not-allowed': item.quantity >= item.stock }"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <span class="font-bold text-lg">${{ (item.price * item.quantity).toFixed(2) }}</span>
          <button 
            @click="removeItem" 
            class="text-red-600 hover:text-red-800 text-sm mt-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['increase-quantity', 'decrease-quantity', 'remove-item']);

const increaseQuantity = () => {
  emit('increase-quantity', props.item);
};

const decreaseQuantity = () => {
  emit('decrease-quantity', props.item);
};

const removeItem = () => {
  emit('remove-item', props.item);
};
</script>
