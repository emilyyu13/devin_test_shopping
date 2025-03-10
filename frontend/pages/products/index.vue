<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Our Products</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useProductStore } from '~/stores/products';
import ProductCard from '~/components/product/ProductCard.vue';

const productStore = useProductStore();

const products = computed(() => productStore.products);

onMounted(() => {
  // Load products from API in a real implementation
  // productStore.fetchProducts();
});
</script>
