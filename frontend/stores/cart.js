import { defineStore } from 'pinia';
import { useProductStore } from './products';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    checkoutStatus: null
  }),
  
  getters: {
    cartItems: (state) => state.items,
    
    itemCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
    
    subtotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    
    tax: (state, getters) => getters.subtotal * 0.08,
    
    shipping: (state, getters) => getters.subtotal > 100 ? 0 : 10,
    
    total: (state, getters) => getters.subtotal + getters.tax + getters.shipping
  },
  
  actions: {
    addToCart(product) {
      const productStore = useProductStore();
      
      // Check if product is in stock
      if (product.stock <= 0) {
        throw new Error('Product is out of stock');
      }
      
      // Find item in cart
      const cartItem = this.items.find(item => item.id === product.id);
      
      if (cartItem) {
        // Increment quantity if already in cart
        cartItem.quantity++;
      } else {
        // Add new item to cart
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
      
      // Update product stock
      productStore.updateProductStock(product.id, 1);
    },
    
    removeFromCart(productId) {
      const productStore = useProductStore();
      const index = this.items.findIndex(item => item.id === productId);
      
      if (index !== -1) {
        const item = this.items[index];
        
        // Return stock
        productStore.updateProductStock(productId, -item.quantity);
        
        // Remove from cart
        this.items.splice(index, 1);
      }
    },
    
    updateQuantity(productId, quantity) {
      const productStore = useProductStore();
      const item = this.items.find(item => item.id === productId);
      
      if (item) {
        const product = productStore.products.find(p => p.id === productId);
        const change = quantity - item.quantity;
        
        // Check if we have enough stock
        if (change > 0 && product.stock < change) {
          throw new Error('Not enough stock available');
        }
        
        // Update stock
        productStore.updateProductStock(productId, change);
        
        // Update quantity
        item.quantity = quantity;
        
        // Remove if quantity is 0
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        }
      }
    },
    
    clearCart() {
      this.items = [];
    },
    
    setCheckoutStatus(status) {
      this.checkoutStatus = status;
    }
  }
});
