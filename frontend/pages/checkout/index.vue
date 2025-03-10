<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Checkout</h1>
    
    <div v-if="isEmpty" class="text-center py-12">
      <p class="text-xl text-gray-600 mb-6">Your cart is empty</p>
      <NuxtLink to="/products" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
        Browse Products
      </NuxtLink>
    </div>
    
    <div v-else class="flex flex-col md:flex-row gap-8">
      <div class="md:w-2/3">
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
          
          <form @submit.prevent="submitOrder" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  id="fullName" 
                  v-model="formData.fullName" 
                  type="text" 
                  class="w-full p-2 border rounded-md"
                  required
                >
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  id="email" 
                  v-model="formData.email" 
                  type="email" 
                  class="w-full p-2 border rounded-md"
                  required
                >
              </div>
            </div>
            
            <div>
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input 
                id="address" 
                v-model="formData.address" 
                type="text" 
                class="w-full p-2 border rounded-md"
                required
              >
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input 
                  id="city" 
                  v-model="formData.city" 
                  type="text" 
                  class="w-full p-2 border rounded-md"
                  required
                >
              </div>
              
              <div>
                <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input 
                  id="state" 
                  v-model="formData.state" 
                  type="text" 
                  class="w-full p-2 border rounded-md"
                  required
                >
              </div>
              
              <div>
                <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input 
                  id="zipCode" 
                  v-model="formData.zipCode" 
                  type="text" 
                  class="w-full p-2 border rounded-md"
                  required
                >
              </div>
            </div>
          </form>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <input 
                id="creditCard" 
                v-model="formData.paymentMethod" 
                type="radio" 
                value="credit_card" 
                class="mr-2"
              >
              <label for="creditCard">Credit Card</label>
            </div>
            
            <div v-if="formData.paymentMethod === 'credit_card'" class="pl-6 space-y-4">
              <div>
                <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input 
                  id="cardNumber" 
                  v-model="formData.cardNumber" 
                  type="text" 
                  class="w-full p-2 border rounded-md"
                  placeholder="**** **** **** ****"
                  required
                >
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    id="expiryDate" 
                    v-model="formData.expiryDate" 
                    type="text" 
                    class="w-full p-2 border rounded-md"
                    placeholder="MM/YY"
                    required
                  >
                </div>
                
                <div>
                  <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input 
                    id="cvv" 
                    v-model="formData.cvv" 
                    type="text" 
                    class="w-full p-2 border rounded-md"
                    placeholder="***"
                    required
                  >
                </div>
              </div>
            </div>
            
            <div class="flex items-center">
              <input 
                id="paypal" 
                v-model="formData.paymentMethod" 
                type="radio" 
                value="paypal" 
                class="mr-2"
              >
              <label for="paypal">PayPal</label>
            </div>
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
          
          <button 
            @click="submitOrder" 
            class="block w-full py-3 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition duration-300"
            :disabled="!formData.paymentMethod"
            :class="{ 'opacity-50 cursor-not-allowed': !formData.paymentMethod }"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '~/stores/cart';
import { useOrderStore } from '~/stores/orders';

const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const formData = ref({
  fullName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  paymentMethod: 'credit_card',
  cardNumber: '',
  expiryDate: '',
  cvv: ''
});

const cartItems = computed(() => cartStore.cartItems);
const isEmpty = computed(() => cartStore.isEmpty);
const subtotal = computed(() => cartStore.subtotal);
const tax = computed(() => cartStore.tax);
const shipping = computed(() => cartStore.shipping);
const total = computed(() => cartStore.total);

const submitOrder = async () => {
  if (isEmpty.value) {
    return;
  }
  
  const orderData = {
    user_name: formData.value.fullName,
    email: formData.value.email,
    address: `${formData.value.address}, ${formData.value.city}, ${formData.value.state} ${formData.value.zipCode}`,
    payment_method: formData.value.paymentMethod
  };
  
  try {
    const result = await orderStore.completeCheckout(orderData, cartItems.value);
    
    if (result && result.order) {
      // Redirect to confirmation page
      router.push(`/checkout/confirmation?id=${result.order.id}`);
    }
  } catch (error) {
    console.error('Error placing order:', error);
    // Show error notification
  }
};

onMounted(() => {
  // Load cart from localStorage
  cartStore.loadCart();
  
  // Redirect to products page if cart is empty
  if (isEmpty.value) {
    router.push('/products');
  }
});
</script>
