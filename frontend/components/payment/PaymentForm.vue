<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold mb-6">Payment Information</h2>
    
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
      <div class="space-y-2">
        <div class="flex items-center">
          <input 
            type="radio" 
            id="creditCard" 
            value="credit_card" 
            v-model="paymentMethod"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500"
          >
          <label for="creditCard" class="ml-2 text-gray-700">Credit Card</label>
        </div>
        
        <div class="flex items-center">
          <input 
            type="radio" 
            id="paypal" 
            value="paypal" 
            v-model="paymentMethod"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500"
          >
          <label for="paypal" class="ml-2 text-gray-700">PayPal</label>
        </div>
      </div>
    </div>
    
    <div v-if="paymentMethod === 'credit_card'" class="space-y-6">
      <div>
        <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <input 
          type="text" 
          id="cardNumber" 
          v-model="cardNumber"
          placeholder="1234 5678 9012 3456"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
      
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input 
            type="text" 
            id="expiryDate" 
            v-model="expiryDate"
            placeholder="MM/YY"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        
        <div>
          <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <input 
            type="text" 
            id="cvv" 
            v-model="cvv"
            placeholder="123"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
      </div>
    </div>
    
    <div v-else-if="paymentMethod === 'paypal'" class="space-y-6">
      <div>
        <label for="paypalEmail" class="block text-sm font-medium text-gray-700 mb-1">PayPal Email</label>
        <input 
          type="email" 
          id="paypalEmail" 
          v-model="paypalEmail"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
      </div>
    </div>
    
    <div class="mt-8">
      <button 
        @click="processPayment"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-medium transition-colors duration-300"
      >
        Pay {{ formatCurrency(amount) }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  amount: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['payment-processed']);

// Payment method
const paymentMethod = ref('credit_card');

// Credit card details
const cardNumber = ref('');
const expiryDate = ref('');
const cvv = ref('');

// PayPal details
const paypalEmail = ref('');

const formatCurrency = (value) => {
  return `$${value.toFixed(2)}`;
};

const processPayment = () => {
  // In a real app, this would call a payment gateway API
  
  // Simulate payment processing
  setTimeout(() => {
    // Create payment data based on selected method
    let paymentData = {
      method: paymentMethod.value,
      amount: props.amount,
      status: 'completed',
      date: new Date().toISOString()
    };
    
    if (paymentMethod.value === 'credit_card') {
      paymentData.cardNumber = `**** **** **** ${cardNumber.value.slice(-4)}`;
      paymentData.expiryDate = expiryDate.value;
    } else if (paymentMethod.value === 'paypal') {
      paymentData.email = paypalEmail.value;
    }
    
    // Emit event with payment data
    emit('payment-processed', paymentData);
  }, 1500);
};
</script>
