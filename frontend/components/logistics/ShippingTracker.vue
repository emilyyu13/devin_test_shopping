<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold mb-6">Shipment Tracking</h2>
    
    <div v-if="!trackingNumber" class="text-center py-6">
      <p class="text-gray-500">No tracking information available yet.</p>
    </div>
    
    <div v-else>
      <div class="flex justify-between items-center mb-6">
        <div>
          <p class="text-sm text-gray-500">Tracking Number</p>
          <p class="font-medium">{{ trackingNumber }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Carrier</p>
          <p class="font-medium">{{ carrier }}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Status</p>
          <p 
            class="font-medium px-3 py-1 rounded-full text-sm inline-flex"
            :class="{
              'bg-yellow-100 text-yellow-800': status === 'processing',
              'bg-blue-100 text-blue-800': status === 'shipped',
              'bg-green-100 text-green-800': status === 'delivered',
              'bg-gray-100 text-gray-800': status === 'pending'
            }"
          >
            {{ formatStatus(status) }}
          </p>
        </div>
      </div>
      
      <div v-if="estimatedDelivery" class="mb-6">
        <p class="text-sm text-gray-500">Estimated Delivery</p>
        <p class="font-medium">{{ formatDate(estimatedDelivery) }}</p>
      </div>
      
      <!-- Shipment Timeline -->
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-0 top-0 h-full w-0.5 bg-gray-200"></div>
        
        <!-- Timeline steps -->
        <div 
          v-for="(event, index) in shipmentEvents" 
          :key="index"
          class="relative pl-8 pb-8 last:pb-0"
        >
          <div class="absolute left-0 -ml-1.5">
            <div 
              class="w-3 h-3 rounded-full"
              :class="{ 
                'bg-green-500': event.completed,
                'bg-gray-300': !event.completed
              }"
            ></div>
          </div>
          <div>
            <h4 
              class="font-medium"
              :class="{ 'text-gray-400': !event.completed }"
            >
              {{ event.name }}
            </h4>
            <p class="text-sm text-gray-500">
              {{ event.completed ? event.date : 'Pending' }}
            </p>
            <p v-if="event.location" class="text-sm text-gray-500 mt-1">
              {{ event.location }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  trackingNumber: {
    type: String,
    default: ''
  },
  carrier: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'pending',
    validator: (value) => ['pending', 'processing', 'shipped', 'delivered'].includes(value)
  },
  estimatedDelivery: {
    type: String,
    default: ''
  },
  events: {
    type: Array,
    default: () => []
  }
});

const formatStatus = (status) => {
  const statuses = {
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered'
  };
  
  return statuses[status] || status;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const shipmentEvents = computed(() => {
  // If events are provided, use them
  if (props.events && props.events.length > 0) {
    return props.events;
  }
  
  // Otherwise, generate default events based on status
  const defaultEvents = [
    {
      name: 'Order Placed',
      completed: true,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    {
      name: 'Processing',
      completed: ['processing', 'shipped', 'delivered'].includes(props.status),
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    {
      name: 'Shipped',
      completed: ['shipped', 'delivered'].includes(props.status),
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      location: 'Distribution Center'
    },
    {
      name: 'Out for Delivery',
      completed: props.status === 'delivered',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      location: 'Local Courier Facility'
    },
    {
      name: 'Delivered',
      completed: props.status === 'delivered',
      date: props.status === 'delivered' ? new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '',
      location: props.status === 'delivered' ? 'Destination Address' : ''
    }
  ];
  
  return defaultEvents;
});
</script>
