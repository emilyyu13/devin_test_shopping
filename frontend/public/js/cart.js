document.addEventListener('DOMContentLoaded', async function() {
  // Cart state
  let cart = {
    items: [],
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
  };

  // Product data
  let products = [];
  
  // Fetch products from API
  try {
    products = await fetchProducts();
    console.log('Products loaded from API:', products);
    
    // Update product display with API data
    updateProductDisplay();
  } catch (error) {
    console.error('Failed to load products from API:', error);
    
    // Fallback to static data if API fails
    products = [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 199.99,
        stock: 15,
        image: 'https://placehold.co/300x200?text=Headphones'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 249.99,
        stock: 3,
        image: 'https://placehold.co/300x200?text=SmartWatch'
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        price: 79.99,
        stock: 0,
        image: 'https://placehold.co/300x200?text=Speaker'
      },
      {
        id: 4,
        name: 'Laptop Backpack',
        price: 59.99,
        stock: 22,
        image: 'https://placehold.co/300x200?text=Backpack'
      }
    ];
    
    updateProductDisplay();
  }

  // Add event listeners to all "Add to Cart" buttons
  function addEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = parseInt(this.getAttribute('data-product-id'));
        addToCart(productId);
      });
    });
  }

  // Add event listeners to quantity buttons
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('quantity-decrease')) {
      const productId = parseInt(e.target.getAttribute('data-product-id'));
      updateQuantity(productId, -1);
    } else if (e.target.classList.contains('quantity-increase')) {
      const productId = parseInt(e.target.getAttribute('data-product-id'));
      updateQuantity(productId, 1);
    } else if (e.target.classList.contains('remove-item')) {
      const productId = parseInt(e.target.getAttribute('data-product-id'));
      removeFromCart(productId);
    }
  });

  // Add checkout button event listener
  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', async function() {
      if (cart.items.length === 0) return;
      
      try {
        // In a real app, we would collect user information from a form
        const orderData = {
          user_name: 'John Doe',
          email: 'john.doe@example.com',
          address: '123 Main St, Anytown, USA',
          status: 'pending'
        };
        
        // Create order
        const order = await createOrder(orderData);
        console.log('Order created:', order);
        
        // Add order items
        for (const item of cart.items) {
          await addOrderItem(order.id, {
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          });
        }
        
        // Process payment
        const payment = await createPayment(order.id, {
          payment_method: 'credit_card'
        });
        console.log('Payment processed:', payment);
        
        // Get updated order
        const updatedOrder = await getOrder(order.id);
        console.log('Updated order:', updatedOrder);
        
        // Clear cart
        cart.items = [];
        updateCartDisplay();
        
        alert('Order placed successfully! Order ID: ' + order.id);
      } catch (error) {
        console.error('Checkout failed:', error);
        alert('Checkout failed: ' + error.message);
      }
    });
  }

  // Update product display with API data
  function updateProductDisplay() {
    const productsContainer = document.querySelector('#products .grid');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
      const stockStatus = product.stock > 5 
        ? `<span class="text-green-600">In Stock: ${product.stock}</span>`
        : product.stock > 0
          ? `<span class="text-yellow-600">Low Stock: ${product.stock}</span>`
          : `<span class="text-red-600">Out of Stock</span>`;
      
      const addButton = product.stock > 0
        ? `<button class="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded add-to-cart" data-product-id="${product.id}">Add to Cart</button>`
        : `<button class="mt-3 w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed" disabled>Out of Stock</button>`;
      
      const productElement = document.createElement('div');
      productElement.className = 'bg-white p-4 rounded-lg shadow-md';
      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded-md mb-4">
        <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
        <div class="flex justify-between items-center">
          <span class="text-gray-800 font-bold">$${product.price.toFixed(2)}</span>
          ${stockStatus}
        </div>
        ${addButton}
      `;
      
      productsContainer.appendChild(productElement);
    });
    
    // Re-add event listeners
    addEventListeners();
  }

  // Add to cart function
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Check if product is in stock
    if (product.stock <= 0) {
      alert('Sorry, this item is out of stock.');
      return;
    }
    
    // Check if product is already in cart
    const existingItem = cart.items.find(item => item.id === productId);
    
    if (existingItem) {
      // Check if we have enough stock
      if (product.stock <= 0) {
        alert('Sorry, we don\'t have enough stock for this item.');
        return;
      }
      
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    // Update product stock
    product.stock -= 1;
    
    // Update cart display
    updateCartDisplay();
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
  }

  // Update quantity function
  function updateQuantity(productId, change) {
    const item = cart.items.find(item => item.id === productId);
    
    if (!item) return;
    
    const product = products.find(p => p.id === productId);
    
    if (change > 0 && product.stock <= 0) {
      alert('Sorry, we don\'t have enough stock for this item.');
      return;
    }
    
    item.quantity += change;
    
    // Update product stock
    product.stock -= change;
    
    // Remove item if quantity is 0 or less
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    // Update cart display
    updateCartDisplay();
  }

  // Remove from cart function
  function removeFromCart(productId) {
    const itemIndex = cart.items.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    const item = cart.items[itemIndex];
    const product = products.find(p => p.id === productId);
    
    // Return stock
    product.stock += item.quantity;
    
    // Remove item from cart
    cart.items.splice(itemIndex, 1);
    
    // Update cart display
    updateCartDisplay();
  }

  // Update cart display
  function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    // Clear cart container
    cartContainer.innerHTML = '';
    
    // Add items to cart display
    cart.items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'border-b pb-4 mb-4';
      itemElement.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded mr-4">
            <div>
              <h3 class="font-semibold">${item.name}</h3>
              <p class="text-gray-600">$${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div class="flex items-center">
            <button class="px-2 py-1 bg-gray-200 rounded quantity-decrease" data-product-id="${item.id}">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="px-2 py-1 bg-gray-200 rounded quantity-increase" data-product-id="${item.id}">+</button>
            <button class="ml-4 text-red-500 remove-item" data-product-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
      cartContainer.appendChild(itemElement);
    });
    
    // If cart is empty, show message
    if (cart.items.length === 0) {
      cartContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
    }
    
    // Calculate totals
    cart.subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    cart.tax = cart.subtotal * 0.08; // 8% tax
    cart.shipping = cart.subtotal > 100 ? 0 : 10; // Free shipping for orders over $100
    cart.total = cart.subtotal + cart.tax + cart.shipping;
    
    // Update totals display
    subtotalElement.textContent = '$' + cart.subtotal.toFixed(2);
    taxElement.textContent = '$' + cart.tax.toFixed(2);
    shippingElement.textContent = '$' + cart.shipping.toFixed(2);
    totalElement.textContent = '$' + cart.total.toFixed(2);
    
    // Update checkout button state
    const checkoutButton = document.getElementById('checkout-button');
    if (cart.items.length === 0) {
      checkoutButton.disabled = true;
      checkoutButton.classList.add('opacity-50', 'cursor-not-allowed');
      checkoutButton.classList.remove('hover:bg-green-700');
    } else {
      checkoutButton.disabled = false;
      checkoutButton.classList.remove('opacity-50', 'cursor-not-allowed');
      checkoutButton.classList.add('hover:bg-green-700');
    }
    
    // Update product display to reflect stock changes
    updateProductDisplay();
  }

  // Initialize cart display
  updateCartDisplay();
});
