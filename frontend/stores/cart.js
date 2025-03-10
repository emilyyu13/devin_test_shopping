import { defineStore } from 'pinia';
import { useProductStore } from './products';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),
  
  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    subtotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    tax: (state) => {
      return state.subtotal * 0.08; // 8% tax
    },
    
    shipping: (state) => {
      return state.subtotal > 100 ? 0 : 10; // Free shipping for orders over $100
    },
    
    total: (state) => {
      return state.subtotal + state.tax + state.shipping;
    }
  },
  
  actions: {
    addToCart(product, quantity = 1) {
      const productStore = useProductStore();
      
      // Check if product is in stock
      if (product.stock < quantity) {
        this.error = 'Not enough stock available';
        return false;
      }
      
      // Check if product is already in cart
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Check if we have enough stock for the additional quantity
        if (product.stock < existingItem.quantity + quantity) {
          this.error = 'Not enough stock available';
          return false;
        }
        
        // Update quantity
        existingItem.quantity += quantity;
      } else {
        // Add new item to cart
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity
        });
      }
      
      // Update product stock (in a real app, this would be done on the server)
      productStore.updateProductStock(product.id, quantity);
      
      this.error = null;
      return true;
    },
    
    updateQuantity(productId, quantity) {
      const productStore = useProductStore();
      const product = productStore.getProductById(productId);
      const item = this.items.find(item => item.id === productId);
      
      if (!item) return;
      
      const quantityDiff = quantity - item.quantity;
      
      // Check if we have enough stock
      if (quantityDiff > 0 && product.stock < quantityDiff) {
        this.error = 'Not enough stock available';
        return false;
      }
      
      // Update quantity
      item.quantity = quantity;
      
      // Update product stock (in a real app, this would be done on the server)
      if (quantityDiff !== 0) {
        productStore.updateProductStock(productId, quantityDiff);
      }
      
      // Remove item if quantity is 0
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
      
      this.error = null;
      return true;
    },
    
    removeFromCart(productId) {
      const index = this.items.findIndex(item => item.id === productId);
      
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    },
    
    clearCart() {
      this.items = [];
    }
  }
});
