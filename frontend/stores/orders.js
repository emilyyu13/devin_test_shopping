import { defineStore } from 'pinia';
import { useCartStore } from './cart';
import { useProductStore } from './products';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getOrderById: (state) => (id) => {
      return state.orders.find(order => order.id === id);
    }
  },
  
  actions: {
    fetchOrders() {
      this.loading = true;
      this.error = null;
      
      // In a real app, this would be an API call
      // For now, use mock data if we don't have any orders
      if (this.orders.length === 0) {
        setTimeout(() => {
          this.orders = [
            {
              id: 1,
              orderNumber: 'ORD-12345',
              date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              status: 'Processing',
              items: [
                {
                  id: 1,
                  name: 'Wireless Headphones',
                  price: 199.99,
                  quantity: 1,
                  image: 'https://placehold.co/300x200?text=Headphones'
                },
                {
                  id: 2,
                  name: 'Smart Watch',
                  price: 249.99,
                  quantity: 1,
                  image: 'https://placehold.co/300x200?text=SmartWatch'
                }
              ],
              subtotal: 449.98,
              tax: 36.00,
              shipping: 0,
              total: 485.98,
              shipping: {
                name: 'John Doe',
                address: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                zipCode: '12345',
                email: 'john@example.com',
                phone: '555-123-4567'
              },
              payment: {
                method: 'Credit Card',
                cardNumber: '**** **** **** 1234'
              },
              trackingNumber: 'TRK-9876543210',
              trackingCompany: 'FedEx'
            }
          ];
          this.loading = false;
        }, 1000);
      } else {
        this.loading = false;
      }
    },
    
    createOrder(orderData) {
      this.loading = true;
      this.error = null;
      
      // In a real app, this would be an API call
      setTimeout(() => {
        // Generate a random order number
        const orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
        
        // Create a new order
        const newOrder = {
          id: this.orders.length + 1,
          orderNumber,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          status: 'Processing',
          items: orderData.items,
          subtotal: orderData.subtotal,
          tax: orderData.tax,
          shipping: orderData.shipping,
          total: orderData.total,
          shipping: orderData.shipping,
          payment: orderData.payment,
          trackingNumber: '',
          trackingCompany: ''
        };
        
        // Add the order to the store
        this.orders.unshift(newOrder);
        
        // Update product stock
        const productStore = useProductStore();
        orderData.items.forEach(item => {
          productStore.updateProductStock(item.id, -item.quantity);
        });
        
        // Clear the cart
        const cartStore = useCartStore();
        cartStore.clearCart();
        
        this.loading = false;
        
        return newOrder;
      }, 1500);
    },
    
    updateOrderStatus(orderId, status) {
      const order = this.getOrderById(orderId);
      
      if (order) {
        order.status = status;
        
        // If the order is shipped, generate a tracking number
        if (status === 'Shipped' && !order.trackingNumber) {
          order.trackingNumber = 'TRK-' + Math.floor(Math.random() * 10000000000);
          order.trackingCompany = ['FedEx', 'UPS', 'USPS'][Math.floor(Math.random() * 3)];
        }
      }
    },
    
    addTrackingInfo(orderId, trackingNumber, trackingCompany) {
      const order = this.getOrderById(orderId);
      
      if (order) {
        order.trackingNumber = trackingNumber;
        order.trackingCompany = trackingCompany;
        
        // Update status to shipped if it's not already
        if (order.status === 'Processing') {
          order.status = 'Shipped';
        }
      }
    }
  }
});
