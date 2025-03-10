import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  
  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    subtotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    shipping: (state) => {
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      return subtotal > 100 ? 0 : 10;
    },
    
    tax: (state) => {
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      return subtotal * 0.08; // 8% tax
    },
    
    total: (state) => {
      const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
      const shipping = subtotal > 100 ? 0 : 10;
      const tax = subtotal * 0.08;
      return subtotal + shipping + tax;
    }
  },
  
  actions: {
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Ensure we don't exceed stock
        const newQuantity = Math.min(existingItem.quantity + quantity, product.stock);
        existingItem.quantity = newQuantity;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          quantity: Math.min(quantity, product.stock),
          stock: product.stock
        });
      }
    },
    
    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    
    updateQuantity(productId, quantity) {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = Math.min(Math.max(1, quantity), item.stock);
      }
    },
    
    clearCart() {
      this.items = [];
    }
  }
});
