// API Service for E-Commerce Order System

// Base API URL - change this to your actual backend URL when deploying
const API_URL = 'http://localhost:3001/api/v1';

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of product objects
 */
async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Create a new order
 * @param {Object} orderData Order data including user_name, email, address, status
 * @returns {Promise<Object>} Created order object
 */
async function createOrder(orderData) {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

/**
 * Add an item to an order
 * @param {number} orderId Order ID
 * @param {Object} orderItemData Order item data including product_id, quantity, price
 * @returns {Promise<Object>} Created order item object
 */
async function addOrderItem(orderId, orderItemData) {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/order_items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderItemData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to add order item: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding order item:', error);
    throw error;
  }
}

/**
 * Process payment for an order
 * @param {number} orderId Order ID
 * @param {Object} paymentData Payment data including payment_method
 * @returns {Promise<Object>} Payment confirmation object
 */
async function createPayment(orderId, paymentData) {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to process payment: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
}

/**
 * Get order details
 * @param {number} orderId Order ID
 * @returns {Promise<Object>} Order details object
 */
async function getOrder(orderId) {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
}

/**
 * Get all orders for a user
 * @param {string} email User email
 * @returns {Promise<Array>} Array of order objects
 */
async function getUserOrders(email) {
  try {
    const response = await fetch(`${API_URL}/orders?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user orders: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

/**
 * Update order status
 * @param {number} orderId Order ID
 * @param {string} status New status
 * @returns {Promise<Object>} Updated order object
 */
async function updateOrderStatus(orderId, status) {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update order status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}
