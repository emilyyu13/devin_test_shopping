import { defineStore } from 'pinia';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
        price: 199.99,
        stock: 15,
        image: 'https://placehold.co/300x200?text=Headphones',
        category: 'Electronics'
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Track your fitness and stay connected with this advanced smartwatch.',
        price: 249.99,
        stock: 3,
        image: 'https://placehold.co/300x200?text=SmartWatch',
        category: 'Electronics'
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof speaker with amazing sound quality.',
        price: 79.99,
        stock: 0,
        image: 'https://placehold.co/300x200?text=Speaker',
        category: 'Electronics'
      },
      {
        id: 4,
        name: 'Laptop Backpack',
        description: 'Durable backpack with anti-theft features and USB charging port.',
        price: 59.99,
        stock: 22,
        image: 'https://placehold.co/300x200?text=Backpack',
        category: 'Accessories'
      },
      {
        id: 5,
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe to keep your coffee hot.',
        price: 89.99,
        stock: 7,
        image: 'https://placehold.co/300x200?text=CoffeeMaker',
        category: 'Home'
      },
      {
        id: 6,
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with alignment lines for proper positioning.',
        price: 29.99,
        stock: 18,
        image: 'https://placehold.co/300x200?text=YogaMat',
        category: 'Fitness'
      },
      {
        id: 7,
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature.',
        price: 39.99,
        stock: 12,
        image: 'https://placehold.co/300x200?text=DeskLamp',
        category: 'Home'
      },
      {
        id: 8,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life and precise tracking.',
        price: 24.99,
        stock: 5,
        image: 'https://placehold.co/300x200?text=Mouse',
        category: 'Electronics'
      }
    ],
    loading: false,
    error: null
  }),
  
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === id);
    },
    
    availableProducts: (state) => {
      return state.products.filter(product => product.stock > 0);
    },
    
    lowStockProducts: (state) => {
      return state.products.filter(product => product.stock > 0 && product.stock <= 5);
    },
    
    outOfStockProducts: (state) => {
      return state.products.filter(product => product.stock === 0);
    }
  },
  
  actions: {
    fetchProducts() {
      this.loading = true;
      this.error = null;
      
      // In a real app, this would be an API call
      setTimeout(() => {
        // Products are already loaded in state
        this.loading = false;
      }, 500);
    },
    
    updateProductStock(productId, quantityChange) {
      const product = this.getProductById(productId);
      
      if (product) {
        // Decrease stock by the quantity ordered
        product.stock -= quantityChange;
        
        // Ensure stock doesn't go below 0
        if (product.stock < 0) {
          product.stock = 0;
        }
        
        // In a real app, we would update the stock on the server
        // return api.updateProductStock(productId, product.stock);
      }
    },
    
    isLowStock(productId) {
      const product = this.getProductById(productId);
      return product && product.stock > 0 && product.stock <= 5;
    },
    
    isOutOfStock(productId) {
      const product = this.getProductById(productId);
      return product && product.stock === 0;
    }
  }
});
