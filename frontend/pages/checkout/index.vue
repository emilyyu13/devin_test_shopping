<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Checkout Form -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
            <form @submit.prevent="submitOrder">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" id="firstName" v-model="shippingInfo.firstName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" id="lastName" v-model="shippingInfo.lastName" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
              </div>
              
              <div class="mb-4">
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" id="address" v-model="shippingInfo.address" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" id="city" v-model="shippingInfo.city" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                  <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" id="state" v-model="shippingInfo.state" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                  <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input type="text" id="zipCode" v-model="shippingInfo.zipCode" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
              </div>
              
              <div class="mb-6">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" v-model="shippingInfo.email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
              
              <div class="mb-6">
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" id="phone" v-model="shippingInfo.phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              </div>
            </form>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-4">Payment Information</h2>
            <div class="mb-4">
              <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input type="text" id="cardNumber" v-model="paymentInfo.cardNumber" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="**** **** **** ****" required>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input type="text" id="expiryDate" v-model="paymentInfo.expiryDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/YY" required>
              </div>
              <div>
                <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input type="text" id="cvv" v-model="paymentInfo.cvv" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="***" required>
              </div>
            </div>
            
            <div class="mb-6">
              <label for="nameOnCard" class="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input type="text" id="nameOnCard" v-model="paymentInfo.nameOnCard" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
          <div class="p-6">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            <div class="space-y-3 mb-6">
              <div v-for="item in cartItems" :key="item.id" class="flex justify-between">
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
            
            <button 
              @click="submitOrder" 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300"
            >
              Place Order
            </button>
            
            <div class="mt-4 text-center text-sm text-gray-600">
              By placing your order, you agree to our 
              <a href="#" class="text-blue-600 hover:text-blue-800">Terms of Service</a> and 
              <a href="#" class="text-blue-600 hover:text-blue-800">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Mock cart data
const cartItems = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 199.99,
    quantity: 1
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    quantity: 2
  },
  {
    id: 8,
    name: 'Wireless Mouse',
    price: 24.99,
    quantity: 1
  }
]);

// Form data
const shippingInfo = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  email: '',
  phone: ''
});

const paymentInfo = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  nameOnCard: ''
});

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
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

// Functions
const submitOrder = () => {
  // In a real application, this would send the order data to an API
  console.log('Order submitted:', {
    items: cartItems.value,
    shipping: shippingInfo.value,
    payment: paymentInfo.value,
    total: total.value
  });
  
  // Navigate to confirmation page
  router.push('/checkout/confirmation');
};
</script>
