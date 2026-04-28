const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  garments: [{
    type: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'],
    default: 'RECEIVED'
  },
  estimatedDeliveryDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Calculate total amount before saving
orderSchema.pre('save', function(next) {
  this.totalAmount = this.garments.reduce((sum, garment) => {
    return sum + (garment.quantity * garment.price);
  }, 0);
  next();
});

module.exports = mongoose.model('Order', orderSchema);
