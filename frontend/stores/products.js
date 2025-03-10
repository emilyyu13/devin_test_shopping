import { defineStore } from 'pinia';
import { fetchProducts } from '~/services/api';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: null
  }),
  
  getters: {
    availableProducts: (state) => state.products.filter(product => product.stock > 0),
    lowStockProducts: (state) => state.products.filter(product => product.stock > 0 && product.stock <= 5),
    outOfStockProducts: (state) => state.products.filter(product => product.stock === 0)
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        this.products = await fetchProducts();
      } catch (error) {
        this.error = error.message;
        console.error('Failed to fetch products:', error);
      } finally {
        this.loading = false;
      }
    },
    
    updateProductStock(productId, quantity) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        product.stock -= quantity;
      }
    }
  }
});
