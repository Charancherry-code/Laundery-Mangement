import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../services/api';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    customerName: '',
    phone: ''
  });

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders(filters);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(orderId);
        fetchOrders();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const getStatusClass = (status) => {
    return `status status-${status.toLowerCase()}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'RECEIVED': return '📥';
      case 'PROCESSING': return '🔄';
      case 'READY': return '✅';
      case 'DELIVERED': return '🚚';
      default: return '📦';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>📋 Orders Management</h2>
      
      {error && <div className="error">⚠️ {error}</div>}

      <div className="card">
        <div className="filter-bar">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">🔍 All Statuses</option>
            <option value="RECEIVED">📥 Received</option>
            <option value="PROCESSING">🔄 Processing</option>
            <option value="READY">✅ Ready</option>
            <option value="DELIVERED">🚚 Delivered</option>
          </select>
          <input
            type="text"
            placeholder="👤 Search by customer name"
            value={filters.customerName}
            onChange={(e) => handleFilterChange('customerName', e.target.value)}
          />
          <input
            type="text"
            placeholder="📱 Search by phone"
            value={filters.phone}
            onChange={(e) => handleFilterChange('phone', e.target.value)}
          />
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No orders found. Try adjusting your filters or create a new order.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Garments</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>
                      <code>{order.orderId.substring(0, 8)}...</code>
                    </td>
                    <td>
                      <strong>{order.customerName}</strong>
                    </td>
                    <td>{order.phone}</td>
                    <td>
                      {order.garments.map((g, i) => (
                        <div key={i} className="garment-detail">
                          <span>{g.type}</span>
                          <span className="garment-qty">x{g.quantity}</span>
                          <span className="garment-price">${g.price}</span>
                        </div>
                      ))}
                    </td>
                    <td>
                      <strong>${order.totalAmount.toFixed(2)}</strong>
                    </td>
                    <td>
                      <span className={getStatusClass(order.status)}>
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                          className="status-select"
                        >
                          <option value="RECEIVED">📥 Received</option>
                          <option value="PROCESSING">🔄 Processing</option>
                          <option value="READY">✅ Ready</option>
                          <option value="DELIVERED">🚚 Delivered</option>
                        </select>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(order.orderId)}
                          title="Delete order"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersList;
