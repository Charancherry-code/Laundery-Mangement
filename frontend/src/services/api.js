const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/orders';

// Create order
export const createOrder = async (orderData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create order');
  }
  return response.json();
};

// Get all orders
export const getAllOrders = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const url = queryParams ? `${API_BASE_URL}?${queryParams}` : API_BASE_URL;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

// Get order by ID
export const getOrderById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  const response = await fetch(`${API_BASE_URL}/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update order status');
  }
  return response.json();
};

// Delete order
export const deleteOrder = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete order');
  }
  return response.json();
};

// Get dashboard stats
export const getDashboard = async () => {
  const response = await fetch(`${API_BASE_URL}/dashboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  return response.json();
};
