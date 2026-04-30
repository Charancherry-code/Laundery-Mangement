import React, { useState } from 'react';
import { createOrder } from '../services/api';

function OrderForm() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [garments, setGarments] = useState([{ type: '', quantity: 1, price: 0 }]);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calculateTotal = () => {
    return garments.reduce((sum, g) => sum + (g.quantity * g.price), 0);
  };

  const addGarment = () => {
    setGarments([...garments, { type: '', quantity: 1, price: 0 }]);
  };

  const removeGarment = (index) => {
    if (garments.length > 1) {
      setGarments(garments.filter((_, i) => i !== index));
    }
  };

  const updateGarment = (index, field, value) => {
    const updated = [...garments];
    updated[index][field] = field === 'type' ? value : Number(value);
    setGarments(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      const orderData = {
        customerName,
        phone,
        garments,
        estimatedDeliveryDate: estimatedDeliveryDate || undefined
      };

      await createOrder(orderData);
      setSuccess(true);
      
      // Reset form
      setCustomerName('');
      setPhone('');
      setGarments([{ type: '', quantity: 1, price: 0 }]);
      setEstimatedDeliveryDate('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>📝 Create New Order</h2>
      
      {error && <div className="error">⚠️ {error}</div>}
      {success && <div className="success">✅ Order created successfully!</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>👤 Customer Name *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="form-group">
            <label>📱 Phone Number (10 digits) *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="\d{10}"
              placeholder="1234567890"
              required
            />
          </div>

          <div className="form-group">
            <label>📅 Estimated Delivery Date</label>
            <input
              type="date"
              value={estimatedDeliveryDate}
              onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>👕 Garments *</label>
            {garments.map((garment, index) => (
              <div key={index} className="garment-item">
                <input
                  type="text"
                  placeholder="Type (e.g., Shirt, Pants)"
                  value={garment.type}
                  onChange={(e) => updateGarment(index, 'type', e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Qty"
                  min="1"
                  value={garment.quantity}
                  onChange={(e) => updateGarment(index, 'quantity', e.target.value)}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  min="0"
                  step="0.01"
                  value={garment.price}
                  onChange={(e) => updateGarment(index, 'price', e.target.value)}
                  required
                />
                {garments.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeGarment(index)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-primary"
              onClick={addGarment}
            >
              ➕ Add Garment
            </button>
          </div>

          <div className="total">
            💵 Total: ${calculateTotal().toFixed(2)}
          </div>

          <button 
            type="submit" 
            className="btn btn-success"
            disabled={submitting}
          >
            {submitting ? '⏳ Creating...' : '✨ Create Order'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;
