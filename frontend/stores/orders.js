import { defineStore } from 'pinia';
import { useApi } from '~/services/api';
import { useCartStore } from './cart';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [
      {
        id: 1,
        orderNumber: 'ORD-12345',
        date: 'March 10, 2025',
        status: 'Delivered',
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
            quantity: 2,
            image: 'https://placehold.co/300x200?text=SmartWatch'
          }
        ],
        subtotal: 699.97,
        shipping: 0,
        tax: 56.00,
        total: 755.97,
        shipping: {
          name: 'John Doe',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567'
        },
        payment: {
          method: 'Credit Card',
          cardNumber: '**** **** **** 1234'
        },
        trackingCompany: 'FedEx',
        trackingNumber: '1234567890',
        timeline: {
          orderPlaced: 'March 5, 2025, 10:30 AM',
          orderProcessed: 'March 6, 2025, 2:15 PM',
          orderShipped: 'March 7, 2025, 9:45 AM',
          orderDelivered: 'March 10, 2025, 11:20 AM'
        }
      },
      {
        id: 2,
        orderNumber: 'ORD-12346',
        date: 'March 5, 2025',
        status: 'Shipped',
        items: [
          {
            id: 8,
            name: 'Wireless Mouse',
            price: 24.99,
            quantity: 1,
            image: 'https://placehold.co/300x200?text=Mouse'
          }
        ],
        subtotal: 24.99,
        shipping: 5.99,
        tax: 2.00,
        total: 32.98,
        shipping: {
          name: 'John Doe',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567'
        },
        payment: {
          method: 'PayPal',
          cardNumber: 'john.doe@example.com'
        },
        trackingCompany: 'UPS',
        trackingNumber: '0987654321',
        timeline: {
          orderPlaced: 'March 5, 2025, 3:45 PM',
          orderProcessed: 'March 6, 2025, 10:30 AM',
          orderShipped: 'March 7, 2025, 2:15 PM'
        }
      },
      {
        id: 3,
        orderNumber: 'ORD-12347',
        date: 'March 1, 2025',
        status: 'Processing',
        items: [
          {
            id: 5,
            name: 'Coffee Maker',
            price: 89.99,
            quantity: 1,
            image: 'https://placehold.co/300x200?text=CoffeeMaker'
          }
        ],
        subtotal: 89.99,
        shipping: 0,
        tax: 7.20,
        total: 97.19,
        shipping: {
          name: 'John Doe',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567'
        },
        payment: {
          method: 'Credit Card',
          cardNumber: '**** **** **** 5678'
        },
        timeline: {
          orderPlaced: 'March 1, 2025, 5:30 PM',
          orderProcessed: 'March 2, 2025, 11:45 AM'
        }
      }
    ],
    loading: false,
    error: null
  }),
  
  getters: {
    getOrderById: (state) => (id) => {
      return state.orders.find(order => order.id === Number(id));
    },
    
    getUserOrders: (state) => {
      // In a real app, this would filter by user ID
      return state.orders;
    }
  },
  
  actions: {
    async fetchOrders() {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        // In a real implementation, this would fetch from the API
        // const orders = await api.get('/orders');
        // this.orders = orders;
        
        // Using mock data for now
        // this.orders already populated in state
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching orders:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchOrder(id) {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        // In a real implementation, this would fetch from the API
        // const order = await api.get(`/orders/${id}`);
        // Update the order in the store
        // const index = this.orders.findIndex(o => o.id === order.id);
        // if (index !== -1) {
        //   this.orders[index] = order;
        // } else {
        //   this.orders.push(order);
        // }
        
        // Using mock data for now
        // Order already in state
      } catch (error) {
        this.error = error.message;
        console.error(`Error fetching order ${id}:`, error);
      } finally {
        this.loading = false;
      }
    },
    
    async createOrder(orderData) {
      const api = useApi();
      const cartStore = useCartStore();
      this.loading = true;
      this.error = null;
      
      try {
        // In a real implementation, this would create via the API
        // const order = await api.post('/orders', orderData);
        
        // Create locally for now
        const newOrder = {
          id: this.orders.length + 1,
          orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          status: 'Processing',
          items: cartStore.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          subtotal: cartStore.subtotal,
          shipping: cartStore.shipping,
          tax: cartStore.tax,
          total: cartStore.total,
          shipping: orderData.shipping,
          payment: orderData.payment,
          timeline: {
            orderPlaced: new Date().toLocaleString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })
          }
        };
        
        this.orders.push(newOrder);
        
        // Clear the cart
        cartStore.clearCart();
        
        return newOrder;
      } catch (error) {
        this.error = error.message;
        console.error('Error creating order:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async updateOrderStatus(orderId, status) {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        // In a real implementation, this would update via the API
        // await api.put(`/orders/${orderId}`, { status });
        
        // Update locally for now
        const order = this.orders.find(order => order.id === orderId);
        if (order) {
          order.status = status;
          
          // Update timeline based on status
          const now = new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          
          if (status === 'Processing' && !order.timeline.orderProcessed) {
            order.timeline.orderProcessed = now;
          } else if (status === 'Shipped' && !order.timeline.orderShipped) {
            order.timeline.orderShipped = now;
          } else if (status === 'Delivered' && !order.timeline.orderDelivered) {
            order.timeline.orderDelivered = now;
          }
        }
      } catch (error) {
        this.error = error.message;
        console.error(`Error updating order ${orderId} status:`, error);
      } finally {
        this.loading = false;
      }
    }
  }
});
