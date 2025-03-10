import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 199.99,
        stock: 15,
        image: 'https://placehold.co/300x200?text=Headphones',
        description: 'High-quality wireless headphones with noise cancellation and long battery life.'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 249.99,
        stock: 3,
        image: 'https://placehold.co/300x200?text=SmartWatch',
        description: 'Feature-rich smart watch with health tracking, notifications, and customizable watch faces.'
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        price: 79.99,
        stock: 0,
        image: 'https://placehold.co/300x200?text=Speaker',
        description: 'Portable Bluetooth speaker with 360° sound and waterproof design.'
      },
      {
        id: 4,
        name: 'Laptop Backpack',
        price: 59.99,
        stock: 22,
        image: 'https://placehold.co/300x200?text=Backpack',
        description: 'Durable laptop backpack with multiple compartments and USB charging port.'
      }
    ],
    loading: false,
    error: null
  }),
  
  getters: {
    availableProducts: (state) => state.products.filter(product => product.stock > 0),
    getProductById: (state) => (id) => state.products.find(product => product.id === id),
    lowStockProducts: (state) => state.products.filter(product => product.stock > 0 && product.stock <= 5)
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      
      try {
        const runtimeConfig = useRuntimeConfig();
        const response = await fetch(`${runtimeConfig.public.apiBaseUrl}/products`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    
    updateStock(productId, quantity) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        product.stock -= quantity;
      }
    },
    
    restoreStock(productId, quantity) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        product.stock += quantity;
      }
    }
  }
});
