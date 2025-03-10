import { defineStore } from 'pinia';
import { useProductStore } from './products';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    taxRate: 0.08,
    shippingFee: 10,
    freeShippingThreshold: 100
  }),
  
  getters: {
    cartItems: (state) => state.items,
    
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    
    subtotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    
    tax: (state) => {
      return state.subtotal * state.taxRate;
    },
    
    shipping: (state) => {
      return state.subtotal >= state.freeShippingThreshold ? 0 : state.shippingFee;
    },
    
    total: (state) => {
      return state.subtotal + state.tax + state.shipping;
    },
    
    isEmpty: (state) => state.items.length === 0
  },
  
  actions: {
    addToCart(product, quantity = 1) {
      const productStore = useProductStore();
      
      // Check if product has enough stock
      if (product.stock < quantity) {
        console.error('Not enough stock');
        return false;
      }
      
      // Check if item already exists in cart
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Check if we can add more of this product
        if (product.stock < (existingItem.quantity + quantity)) {
          console.error('Not enough stock');
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
          quantity
        });
      }
      
      // Update product stock
      productStore.updateStock(product.id, quantity);
      
      // Save cart to localStorage
      this.saveCart();
      
      return true;
    },
    
    removeFromCart(productId) {
      const productStore = useProductStore();
      const item = this.items.find(item => item.id === productId);
      
      if (item) {
        // Restore stock
        productStore.restoreStock(productId, item.quantity);
        
        // Remove item from cart
        this.items = this.items.filter(item => item.id !== productId);
        
        // Save cart to localStorage
        this.saveCart();
      }
    },
    
    updateQuantity(productId, quantity) {
      const productStore = useProductStore();
      const item = this.items.find(item => item.id === productId);
      
      if (item) {
        const product = productStore.getProductById(productId);
        const stockAvailable = product.stock + item.quantity;
        
        if (quantity > stockAvailable) {
          console.error('Not enough stock');
          return false;
        }
        
        // Restore original stock
        productStore.restoreStock(productId, item.quantity);
        
        // Update quantity
        item.quantity = quantity;
        
        // Update stock with new quantity
        productStore.updateStock(productId, quantity);
        
        // Save cart to localStorage
        this.saveCart();
        
        return true;
      }
      
      return false;
    },
    
    clearCart() {
      const productStore = useProductStore();
      
      // Restore all stock
      this.items.forEach(item => {
        productStore.restoreStock(item.id, item.quantity);
      });
      
      // Clear cart
      this.items = [];
      
      // Save cart to localStorage
      this.saveCart();
    },
    
    saveCart() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.items));
      }
    },
    
    loadCart() {
      if (process.client) {
        const productStore = useProductStore();
        const savedCart = localStorage.getItem('cart');
        
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          
          // Validate each item in the cart
          parsedCart.forEach(item => {
            const product = productStore.getProductById(item.id);
            
            if (product && product.stock >= item.quantity) {
              // Add item to cart
              this.items.push(item);
              
              // Update product stock
              productStore.updateStock(item.id, item.quantity);
            }
          });
        }
      }
    }
  }
});
