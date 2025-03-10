import { defineStore } from 'pinia';
import { useCartStore } from './cart';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [],
    currentOrder: null,
    loading: false,
    error: null
  }),
  
  getters: {
    getOrderById: (state) => (id) => state.orders.find(order => order.id === id),
    getUserOrders: (state) => (email) => state.orders.filter(order => order.email === email)
  },
  
  actions: {
    async createOrder(orderData) {
      this.loading = true;
      this.error = null;
      
      try {
        const runtimeConfig = useRuntimeConfig();
        const response = await fetch(`${runtimeConfig.public.apiBaseUrl}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to create order');
        }
        
        const order = await response.json();
        this.currentOrder = order;
        this.orders.push(order);
        
        return order;
      } catch (error) {
        console.error('Error creating order:', error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    async addOrderItems(orderId, items) {
      this.loading = true;
      this.error = null;
      
      try {
        const runtimeConfig = useRuntimeConfig();
        
        for (const item of items) {
          const response = await fetch(`${runtimeConfig.public.apiBaseUrl}/orders/${orderId}/order_items`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          });
          
          if (!response.ok) {
            throw new Error(`Failed to add item ${item.product_id} to order`);
          }
        }
        
        return true;
      } catch (error) {
        console.error('Error adding order items:', error);
        this.error = error.message;
        return false;
      } finally {
        this.loading = false;
      }
    },
    
    async processPayment(orderId, paymentData) {
      this.loading = true;
      this.error = null;
      
      try {
        const runtimeConfig = useRuntimeConfig();
        const response = await fetch(`${runtimeConfig.public.apiBaseUrl}/orders/${orderId}/payments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentData)
        });
        
        if (!response.ok) {
          throw new Error('Failed to process payment');
        }
        
        const payment = await response.json();
        
        // Update order status
        const order = this.getOrderById(orderId);
        if (order) {
          order.status = 'processing';
        }
        
        return payment;
      } catch (error) {
        console.error('Error processing payment:', error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchOrder(orderId) {
      this.loading = true;
      this.error = null;
      
      try {
        const runtimeConfig = useRuntimeConfig();
        const response = await fetch(`${runtimeConfig.public.apiBaseUrl}/orders/${orderId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch order');
        }
        
        const order = await response.json();
        
        // Update order in state
        const existingOrderIndex = this.orders.findIndex(o => o.id === order.id);
        if (existingOrderIndex >= 0) {
          this.orders[existingOrderIndex] = order;
        } else {
          this.orders.push(order);
        }
        
        return order;
      } catch (error) {
        console.error('Error fetching order:', error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchUserOrders(email) {
      this.loading = true;
      this.error = null;
      
      try {
        const runtimeConfig = useRuntimeConfig();
        const response = await fetch(`${runtimeConfig.public.apiBaseUrl}/orders?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user orders');
        }
        
        const orders = await response.json();
        
        // Update orders in state
        orders.forEach(order => {
          const existingOrderIndex = this.orders.findIndex(o => o.id === order.id);
          if (existingOrderIndex >= 0) {
            this.orders[existingOrderIndex] = order;
          } else {
            this.orders.push(order);
          }
        });
        
        return orders;
      } catch (error) {
        console.error('Error fetching user orders:', error);
        this.error = error.message;
        return [];
      } finally {
        this.loading = false;
      }
    },
    
    async updateOrderStatus(orderId, status) {
      this.loading = true;
      this.error = null;
      
      try {
        const runtimeConfig = useRuntimeConfig();
        const response = await fetch(`${runtimeConfig.public.apiBaseUrl}/orders/${orderId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        });
        
        if (!response.ok) {
          throw new Error('Failed to update order status');
        }
        
        const updatedOrder = await response.json();
        
        // Update order in state
        const order = this.getOrderById(orderId);
        if (order) {
          order.status = status;
        }
        
        return updatedOrder;
      } catch (error) {
        console.error('Error updating order status:', error);
        this.error = error.message;
        return null;
      } finally {
        this.loading = false;
      }
    },
    
    completeCheckout(orderData, cartItems) {
      const cartStore = useCartStore();
      
      // Create order
      return this.createOrder(orderData)
        .then(order => {
          if (!order) {
            throw new Error('Failed to create order');
          }
          
          // Prepare order items
          const orderItems = cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          }));
          
          // Add order items
          return this.addOrderItems(order.id, orderItems)
            .then(success => {
              if (!success) {
                throw new Error('Failed to add order items');
              }
              
              // Process payment
              return this.processPayment(order.id, {
                payment_method: orderData.payment_method
              });
            })
            .then(payment => {
              if (!payment) {
                throw new Error('Failed to process payment');
              }
              
              // Clear cart
              cartStore.clearCart();
              
              return { order, payment };
            });
        });
    }
  }
});
