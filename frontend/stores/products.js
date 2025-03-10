import { defineStore } from 'pinia';
import { useApi } from '~/services/api';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
        price: 199.99,
        image: 'https://placehold.co/300x200?text=Headphones',
        stock: 15,
        categoryId: 1
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Track your fitness and stay connected with this advanced smartwatch.',
        price: 249.99,
        image: 'https://placehold.co/300x200?text=SmartWatch',
        stock: 3,
        categoryId: 1
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof speaker with amazing sound quality.',
        price: 79.99,
        image: 'https://placehold.co/300x200?text=Speaker',
        stock: 0,
        categoryId: 1
      },
      {
        id: 4,
        name: 'Laptop Backpack',
        description: 'Durable backpack with anti-theft features and USB charging port.',
        price: 59.99,
        image: 'https://placehold.co/300x200?text=Backpack',
        stock: 22,
        categoryId: 2
      },
      {
        id: 5,
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe to keep your coffee hot.',
        price: 89.99,
        image: 'https://placehold.co/300x200?text=CoffeeMaker',
        stock: 7,
        categoryId: 3
      },
      {
        id: 6,
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat with alignment lines for proper positioning.',
        price: 29.99,
        image: 'https://placehold.co/300x200?text=YogaMat',
        stock: 18,
        categoryId: 4
      },
      {
        id: 7,
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature.',
        price: 39.99,
        image: 'https://placehold.co/300x200?text=DeskLamp',
        stock: 12,
        categoryId: 3
      },
      {
        id: 8,
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life and precise tracking.',
        price: 24.99,
        image: 'https://placehold.co/300x200?text=Mouse',
        stock: 5,
        categoryId: 1
      }
    ],
    
    categories: [
      { id: 1, name: 'Electronics', image: 'https://placehold.co/300x200?text=Electronics' },
      { id: 2, name: 'Clothing', image: 'https://placehold.co/300x200?text=Clothing' },
      { id: 3, name: 'Home & Kitchen', image: 'https://placehold.co/300x200?text=Home' },
      { id: 4, name: 'Sports & Outdoors', image: 'https://placehold.co/300x200?text=Sports' }
    ],
    
    loading: false,
    error: null
  }),
  
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(product => product.id === Number(id));
    },
    
    getProductsByCategory: (state) => (categoryId) => {
      if (!categoryId) return state.products;
      return state.products.filter(product => product.categoryId === categoryId);
    },
    
    getCategories: (state) => {
      return state.categories;
    }
  },
  
  actions: {
    async fetchProducts() {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        // In a real implementation, this would fetch from the API
        // const products = await api.get('/products');
        // this.products = products;
        
        // Using mock data for now
        // this.products already populated in state
      } catch (error) {
        this.error = error.message;
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProduct(id) {
      const api = useApi();
      this.loading = true;
      this.error = null;
      
      try {
        // In a real implementation, this would fetch from the API
        // const product = await api.get(`/products/${id}`);
        // Update the product in the store
        // const index = this.products.findIndex(p => p.id === product.id);
        // if (index !== -1) {
        //   this.products[index] = product;
        // } else {
        //   this.products.push(product);
        // }
        
        // Using mock data for now
        // Product already in state
      } catch (error) {
        this.error = error.message;
        console.error(`Error fetching product ${id}:`, error);
      } finally {
        this.loading = false;
      }
    },
    
    async updateProductStock(productId, quantity) {
      const product = this.getProductById(productId);
      if (product) {
        // In a real implementation, this would update via the API
        // await api.put(`/products/${productId}`, { stock: product.stock - quantity });
        
        // Update locally for now
        product.stock = Math.max(0, product.stock - quantity);
      }
    }
  }
});
