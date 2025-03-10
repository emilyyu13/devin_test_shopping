import { defineStore } from 'pinia';
import { createOrder, addOrderItem, createPayment, getOrder } from '~/services/api';
import { useCartStore } from './cart';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    currentOrder: null,
    orderHistory: [],
    loading: false,
    error: null
  }),
  
  actions: {
    async checkout(customerInfo, paymentMethod) {
      this.loading = true;
      this.error = null;
      
      try {
        const cartStore = useCartStore();
        
        // Create order
        const orderData = {
          user_name: customerInfo.name,
          email: customerInfo.email,
          address: customerInfo.address,
          status: 'pending'
        };
        
        const order = await createOrder(orderData);
        this.currentOrder = order;
        
        // Add order items
        for (const item of cartStore.items) {
          await addOrderItem(order.id, {
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          });
        }
        
        // Process payment
        await createPayment(order.id, {
          payment_method: paymentMethod
        });
        
        // Get updated order with payment info
        this.currentOrder = await getOrder(order.id);
        
        // Add to order history
        this.orderHistory.push(this.currentOrder);
        
        // Clear cart
        cartStore.clearCart();
        cartStore.setCheckoutStatus('success');
        
        return this.currentOrder;
      } catch (error) {
        this.error = error.message;
        console.error('Checkout failed:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async fetchOrder(orderId) {
      this.loading = true;
      this.error = null;
      
      try {
        const order = await getOrder(orderId);
        
        // Update current order if it's the same
        if (this.currentOrder && this.currentOrder.id === orderId) {
          this.currentOrder = order;
        }
        
        // Update in order history if exists
        const index = this.orderHistory.findIndex(o => o.id === orderId);
        if (index !== -1) {
          this.orderHistory[index] = order;
        } else {
          this.orderHistory.push(order);
        }
        
        return order;
      } catch (error) {
        this.error = error.message;
        console.error('Failed to fetch order:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});
